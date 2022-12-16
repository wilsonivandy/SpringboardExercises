const App = () => (
    <div>
      <Person name="Angel" age={16} hobbies={[{id:1, hobby:"studying"}, {id:2, hobby:"shopping"}, {id:3, hobby:"tiktok"}]}/>
      <Person name="Wilson" age={22} hobbies={[{id:1, hobby:"coding"}, {id:2, hobby:"fitness"}, {id:3, hobby:"sleeping"}]}/>
      <Person name="William" age={27} hobbies={[{id:1, hobby:"fitness"}, {id:2, hobby:"business"}, {id:3, hobby:"going out"}]}/>
      <Person name="AbrianNatan" age={58} hobbies={[{id:1, hobby:"swimming"}, {id:2, hobby:"running"}, {id:3, hobby:"shopping"}]}/>
    </div>
  )
  ReactDOM.render(<App />, document.getElementById("root"))