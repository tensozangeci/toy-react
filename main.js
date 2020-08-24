import {createElement, Component, render} from './toy-react';

class App extends Component {
  render() {
    return (
      <div>
        <p>This is Toy React</p>
        {this.children}
      </div>
    )
  }
}

render(<App id="app" class="page">
  <p>This is first class</p>
</App>, document.body)