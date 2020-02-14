/*
** server.c -- a stream socket server demo
*/

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <sys/wait.h>
#include <signal.h>
#include <sqlite3.h>
#include "helpers.h"
#include <time.h>


#define MYPORT 3490
#define MAXDATASIZE 100   // the port users will be connecting to

#define BACKLOG 10     // how many pending connections queue will hold

void sigchld_handler(int s)
{
    while (waitpid(-1, NULL, WNOHANG) > 0);
}

struct item
{
    double cost;
    double price_limit;
    char description[200];
    int bids;

    /* data */
};



int main(void)
{
    int sockfd, new_fd, numbytes;  // listen on sock_fd, new connection on new_fd
    struct sockaddr_in my_addr;    // my address information
    struct sockaddr_in their_addr; // connector's address information
    socklen_t sin_size;
    struct sigaction sa;
    struct item bango;
    bango.bids = 0;
    bango.cost = 0.0;
    bango.price_limit = 10;
    int temp;
    int yes = 1;
    int ret = 0;

    sqlite3_stmt *query = NULL;
    sqlite3 *db;
    char *zErrMsg = 0;
    int rc;



    if ((sockfd = socket(PF_INET, SOCK_STREAM, 0)) == -1)
    {
        perror("socket");
        exit(1);
    }

    if (setsockopt(sockfd, SOL_SOCKET, SO_REUSEADDR, &yes, sizeof(int)) == -1)
    {
        perror("setsockopt");
        exit(1);
    }
    my_addr.sin_family = AF_INET;         // host byte order
    my_addr.sin_port = htons(MYPORT);     // short, network byte order
    my_addr.sin_addr.s_addr = INADDR_ANY; // automatically fill with my IP
    memset(&(my_addr.sin_zero), '\0', 8); // zero the rest of the struct

    if (bind(sockfd, (struct sockaddr *)&my_addr, sizeof(struct sockaddr)) == -1)
    {
        perror("bind");
        exit(1);
    }

    if (listen(sockfd, BACKLOG) == -1)
    {
        perror("listen");
        exit(1);
    }

    sa.sa_handler = sigchld_handler; // reap all dead processes
    sigemptyset(&sa.sa_mask);
    sa.sa_flags = SA_RESTART;
    if (sigaction(SIGCHLD, &sa, NULL) == -1)
    {
        perror("sigaction");
        exit(1);
    }

    while ((new_fd = accept(sockfd, (struct sockaddr *)&their_addr, &sin_size)))
    {
        sin_size = sizeof(struct sockaddr_in);
        printf("server: got connection from %s\n", inet_ntoa(their_addr.sin_addr));

        if (!fork())
        {
            close(sockfd); // child doesn't need the listener

            if (send(new_fd, "Your bet has been received!\n", 50, 0) == -1)
                perror("send");

            while ((numbytes = recv(new_fd, &temp, MAXDATASIZE - 1, 0))  > 0 )
            {

                int bet = ntohl(temp);
                printf("Received: %d\n", bet);
                char str[15], newcoststr[15], name[20];
                int bids, cost, newcost, max, id;

                srand (time(NULL));
                id = 1 + (rand() % 10);
                bids = item_info(id, 1);
                max = item_info(id, 3);
                cost = item_info(id, 4);
                item_name(id,name);

                newcost = bet + cost;

                if (newcost == max)
                {
                    char *message = str_replace( "You won! [ is yours.\n", "[", name);
                    if (send(new_fd, message, 100, 0) == -1)
                        perror("send");
                }

                else if (newcost > max)
                {
                    char *message = str_replace( "This item,[ , isn't available\n", "[", name);
                    if (send(new_fd, message, 100, 0) == -1)
                        perror("send");
                    break;
                }
                else
                {
                    char *message = str_replace( "You're still in the bid for [ \n", "[", name);
                    if (send(new_fd, message, 50, 0) == -1)
                        perror("send");

                }

                sprintf(str, "%d", bids + 1);
                rc = sqlite3_open("test.db", &db);

                char *smt = str_replace( "UPDATE items SET bids=?,cost=[ WHERE id=!", "?", str);
                sprintf(str, "%d", id);
                smt = str_replace(smt , "!", str);

                sprintf(str, "%d", newcost);
                smt = str_replace(smt , "[", str);
                //printf("%s\n", smt);


                if (SQLITE_OK != (rc = sqlite3_prepare_v2(db, smt, -1, &query, 0)))
                {
                    printf("Failed to prepare insert: %d, %s\n", rc, sqlite3_errmsg(db));
                }

                rc = sqlite3_step(query);
                sqlite3_finalize(query);

                sqlite3_close(db);


                memset(name,0,sizeof(name));
            }
            close(new_fd);
            exit(0);
        }
        close(new_fd);  // parent doesn't need this
    }


    return 0;
}




