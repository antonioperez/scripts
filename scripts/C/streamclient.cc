/*
** client.c -- a stream socket client demo
*/

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <netdb.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <sys/socket.h>
#include <time.h>


#define PORT 3490 // the port client will be connecting to 

#define MAXDATASIZE 100 // max number of bytes we can get at once 

int main(int argc, char *argv[])
{
    int sockfd, numbytes, numbytes1; 
    char buf[MAXDATASIZE];
    int bid;
    struct hostent *he;
    struct sockaddr_in their_addr; // connector's address information 

    srand(time(NULL));
    if (argc != 2) {
        
        fprintf(stderr,"usage: client hostname\n");
        exit(1);
    }

    if ((he=gethostbyname(argv[1])) == NULL) {  // get the host info 
        herror("gethostbyname");
        exit(1);
    }

    if ((sockfd = socket(PF_INET, SOCK_STREAM, 0)) == -1) {
        perror("socket");
        exit(1);
    }

    their_addr.sin_family = AF_INET;    // host byte order 
    their_addr.sin_port = htons(PORT);  // short, network byte order 
    their_addr.sin_addr = *((struct in_addr *)he->h_addr);
    memset(&(their_addr.sin_zero), '\0', 8);  // zero the rest of the struct 

    if (connect(sockfd, (struct sockaddr *)&their_addr, sizeof(struct sockaddr)) == -1) {
        perror("connect");
        exit(1);
    }
    
    int temp;
    //keep sending a bid to the server. 
    while ((numbytes=recv(sockfd, &buf, MAXDATASIZE-1, 0))  > 0){
        //temp = 1 + (rand() % 10);
        temp =1;
        int bet = htonl(temp);
        if (send(sockfd, (const char*)&bet, sizeof(bet), 0) == -1)
            perror("send");

        buf[numbytes] = '\0';
        printf("Received: %s",buf);
        if (strcmp("The Bid has ended",buf) == 0){
            printf("You won!\n");
            break;

        }
        
        struct timespec time;
        time.tv_sec = rand() % 3;
        time.tv_nsec = 500+rand() % 1000;
        nanosleep(&time,NULL);

    }


    close(sockfd);

    return 0;
} 
