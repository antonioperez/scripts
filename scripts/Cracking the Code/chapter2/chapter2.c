#include <stdlib.h>
#include <stdio.h>

struct Node {
   int val;
   Node *next;
};


void printList(Node *list){
   Node *curr = list;
   while(curr) {
      printf("%d ", curr->val);
      curr = curr->next;
   }
   printf("\n");
}
int inArray(int *arry, int target, int size){
   for (int i = 0; i < size; ++i)
      {
         if (target == arry[i])
         {
            return 1;
         }
      }
   return 0;
}

/* 2.1 Write code to remove duplicates from an unsorted linked list*/
Node *RemoveDup(Node *list){
   Node *c = list;
   Node *head, *temp;
   head = NULL;
   int buffer[50];
   int index = 0, size = 50;

   for (int i = 0; i < size; ++i){ 
         //initialize array 
         buffer[i] = -1;
   }
   while(c->next != NULL){
      if (inArray(buffer, c->val, size) < 1){
         temp = (Node *)malloc(sizeof(Node));
         temp->val = c->val;
         temp->next = head;
         head = temp;
      }
      buffer[index] = c->val;    
      c = c->next; 
      index++;
   }
   return head;

}

int main() {
   Node *curr, *head;
   int i;

   head = NULL;
   for(i=0;i<=10;++i) {
      curr = (Node *)malloc(sizeof(Node));
      curr->val = rand() % 5;
      curr->next = head;
      head = curr;
   }
   printList(curr);
   curr = RemoveDup(curr);
   printList(curr);

   return 0;
}