/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

const swapPairs = function(head) {
  if(!head || !head.next){
      return head;
  }
  
  head.next.next = swapPairs(head.next.next);
  const next = head.next;
  head.next = next.next;
  next.next = head;
  return next;
};