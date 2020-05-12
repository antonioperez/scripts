
class Trie {
  constructor(){
    this.root = TrieNode();
  }

  insert(string){
    let current = this.root;
    for (const char of string) {
      if(!current.contains(char)){
        current.addData(char);
      }

      current = current.getNode(char);
    }

    current.setWord(true);
  }
  
  hasPrefix(prefix){
    let current = this.root;
    for (const char of prefix) {
      if(!current.contains(char)){
        return false;
      }

      current = current.getNode(char);
    }

    return true;
  }

  hasWord(word){
    let current = root;
    for (const char of word) {
      if(!current.contains(char)){
        return false;
      }
      current.getNode(char);
    }

    return true;
  }

  delete(word){
    if(!word) {
      return;
    }

    let lastNode = this.getLastNode(word);
    if(!lastNode){
      return;
    }

    lastNode.setWord(false);

    if(lastNode.getMap().length > 0){
      return;
    }

    this.removeLastNodeWithMultipleChildren(word);
  }

  getLastNode(word){
    let current = this.root;
    for (const char of word) {
      if(!current.contains(char)){
        return null;
      }

      current = current.getNode(char);
    }

    return current;
  }

  removeLastNodeWithMultipleChildren(word){
    let lastNodeWithMultipleChildren = null;
    let childToBreak = 0;
    let current = this.root;

    for (const index in word) {
      const char = word[index];

      if(!current.contains(char)){
        return;
      }

      current = current.getNode(char);

      if(current.getMap().length > 1 || current.isWord()){
        lastNodeWithMultipleChildren = current;
        childToBreak = word[index++];
      }

      if(lastNodeWithMultipleChildren) {
        lastNodeWithMultipleChildren.getMap()[childToBreak] = null;
      } else {
        this.root.getMap()[word[0]] = null;
      }
    }
  }
}

class TrieNode {
  constructor(){
    this.nodeMap = {};
    this.isWord = false;
  }

  addData(data){
    if(!this.nodeMap[data]){
      this.nodeMap[data] = new TreeNode();
    }
  }

  isWord(){
    return this.isWord;
  }

  setWord(isWord){
    this.isWord = isWord;
  }

  getNode(char){
    return this.nodeMap[char];
  }

  getMap() {
    return this.nodeMap;
  }

  contains(char){
    return !!this.nodeMap[char];
  }
}