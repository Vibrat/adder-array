
class Node {
  constructor(
    value,
    adjacent_list = [],
    indegree_list = [],
    isOperator = false
  ) {
    this.value = value;
    this.adjacent_list = adjacent_list;
    this.indegree_list = indegree_list;
    this.isOperator = isOperator;
  }
}

class Operator {
  constructor() {
    this.operator_set = [];
  }

  addOperator(...operator) {
    this.operator_set.push(operator);
  }

  getOperators() {
    return flatten(this.operator_set);
  }

  getOperatorGroups() {
    return this.operator_set.map(item => {
      return item.join("");
    });
  }
}

class Computator {
  static reverse(nodes, operation) {
    for (let i = 0; i < operation.length; i++) {
      let startIndex = nodes.indexOf(operation[i]);
      let endIndex = nodes.indexOf(operation[i].adjacent_list[0]);

      for (
        let start = startIndex, end = endIndex;
        start < end;
        start++, end--
      ) {
        let tempNode = Object.assign({}, nodes[start]);
        nodes[start] = nodes[end];
        nodes[end] = tempNode;
      }
    }

    return nodes;
  }
}

class Graph {
  constructor(data, directed = false) {
    if (!(data instanceof Array)) {
      throw new Error("Paramater `data` for Graph must be type of Array");
    }

    this.numVertices = data.length;
    this.directed = directed;
    this.adjacent_set = [];
    this.operator_set = [];
    this.operation = [];
    this.operator = new Operator();
    this.operator.addOperator("(", ")");

    for (let i = 0; i < this.numVertices; i++) {
      let node = new Node(
        data[i],
        [i != this.numVertices - 1 ? data[i + 1] : null],
        [i ? data[i - 1] : null],
        this.operator.getOperators().indexOf(data[i]) != -1
      );

      this.adjacent_set[i] = node;

      if (this.operator.getOperators().indexOf(data[i]) != -1) {
        let operatorMatch = false;

        for (let j = this.operator_set.length - 1; j >= 0; j--) {
          let operator = this.operator_set[j];

          if (!operator) {
            continue;
          }

          if (
            this.operator
              .getOperatorGroups()
              .indexOf(`${operator.value}${data[i]}`) != -1
          ) {
            node.adjacent_list = [];
            operator.adjacent_list = [node];

            this.operation.push(operator);
            this.operator_set = this.operator_set.filter(
              item => item != operator
            );
            operatorMatch = true;
            break;
          }
        }

        if (!operatorMatch) {
          this.operator_set.push(node);
        }
      }
    }
  }

  adjacent_vertices() {
    return this.adjacent_set;
  }

  operator_vertices() {
    return this.operator_set;
  }

  display() {
    console.log(
      this.adjacent_set.reduce(
        (total, node) => `${total}${!node.isOperator ? node.value : ""}`,
        ""
      )
    );
  }
}

//recursive flatten deep
function flatten(array) {
  var flattend = [];
  (function flat(array) {
    array.forEach(function(el) {
      if (Array.isArray(el)) flat(el);
      else flattend.push(el);
    });
  })(array);
  return flattend;
}

let sample1 = "(bar)";
let graph = new Graph(sample1.split(''));
Computator.reverse(graph.adjacent_vertices(), graph.operation);
graph.display();


let sample2 = "foo(bar)baz";
let graph2 = new Graph(sample2.split(''));
Computator.reverse(graph2.adjacent_vertices(), graph.operation);
graph2.display();