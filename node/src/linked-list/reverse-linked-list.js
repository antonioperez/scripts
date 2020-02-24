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
const reverseList = function(head) {
  if(!head || !head.next) {
    return head;
  }

  let temp = reverseList(head.next);
  head.next.next = head
  head.next = null;
  return temp;
};