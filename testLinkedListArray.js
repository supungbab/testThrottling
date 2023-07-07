function Node(data) {
  this.front = null;
  this.data = data;
  this.rear = null;
}

function DoubleLinkedList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
  this.push = (...datum) => {
    for (const data of datum) {
      const node = new Node(data);

      if (this.length) {
        const nowTail = this.tail;
        // 현재 노드 대가리에 링크드리스트 꼬리를 연결
        node.front = nowTail;
        // 현재 링크드리스트 꼬리에 현재 입력
        nowTail.rear = node;

        // push 로 추가했으므로 현재 노드를 마지막 꼬리로 변경
        this.tail = node;
      } else {
        // 아무것도 없을 때는 현재 노드를 추가
        this.head = node;
        this.tail = node;
      }

      this.length++;
    }
  };
  this.pop = () => {
    if (this.tail === null) {
      return null;
    }
    const nowTail = this.tail;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.front;
      this.tail.rear = null;
    }

    this.length--;
    return nowTail.data;
  };
  this.unshift = (...datum) => {
    for (const data of datum) {
      const node = new Node(data);

      if (this.length) {
        const nowHead = this.head;
        // 현재 노드 꼬리에 링크드리스트 대가리를 연결
        node.rear = nowHead;
        // 현재 링크드리스트 대가리에 현재 입력
        nowHead.front = node;

        // push 로 추가했으므로 현재 노드를 마지막 꼬리로 변경
        this.head = node;
      } else {
        // 아무것도 없을 때는 현재 노드를 추가
        this.head = node;
        this.tail = node;
      }

      this.length++;
    }
  };
  this.shift = () => {
    if (this.head === null) {
      return null;
    }
    const nowHead = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.rear;
      this.head.front = null;
    }

    this.length--;
    return nowHead.data;
  };
}

module.exports = DoubleLinkedList;
//
// const q = new DoubleLinkedList();
// q.unshift(1, 2, 3, 4);
// q.push(5);
// q.push(6, 7);
// console.log(q);
// q.pop();
// console.log(q);
// q.pop();
// console.log(q);
// q.pop();
// console.log(q);
// q.pop();
// console.log(q);
// q.pop();
// console.log(q);
// q.pop();
// console.log(q);
// q.pop();
// console.log(q);
