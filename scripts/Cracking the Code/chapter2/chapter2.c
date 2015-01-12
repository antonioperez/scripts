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

/* 2.2 Implement an algorithm to find the kth to last element of a singly linked list.*/
int kthElement(Node *list, int k){
   int index = 0, sizeList, pos, val=-1;
   Node *curr = list;
   while(curr) {
      sizeList++;
      curr = curr->next;
   }
   pos = sizeList - k;
   if (pos < 0){
      return val;
   }
   curr = list;
   while(curr) {
      if (index == pos){
         val = curr->val;
      }
      curr = curr->next;
      index++;
   }
   return val;

}

int main() {
   Node *curr, *head, *temp;
   int i;

   head = NULL;
   for(i=0;i<=10;++i) {
      curr = (Node *)malloc(sizeof(Node));
      curr->val = rand() % 10;
      curr->next = head;
      head = curr;
   }
   temp = curr;
   printList(curr);
   curr = RemoveDup(curr);
   printList(curr);
   printf("%d\n", kthElement(curr,5));



   return 0;
}