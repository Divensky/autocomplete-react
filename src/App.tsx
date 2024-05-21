import { useState } from 'react';
import './App.css';

function App() {
  const fruits = ['apple', 'apppple', 'orange', 'bannana', 'a', 'b'];
  const [searchQuery, setSearchQuery] = useState<string>('');
  const filteredFruits = fruits.filter(
    (fruit) => searchQuery !== '' && fruit.includes(searchQuery)
  );

  const debounce = (f: (...args: any) => void, timeout: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        f.apply(this, args);
      }, timeout);
    };
  };
  console.log('filteredFruits', filteredFruits, searchQuery);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(evt.target.value);
    console.log('evt', evt.target.value);
  };

  const deboundedHandleChange = debounce(handleChange, 500);

  const makeBold = (fruit: string) => {
    const firstIndex = fruit.indexOf(searchQuery);
    const firstPart = fruit.substring(0, firstIndex);
    const lastPart = fruit.substring(firstIndex + searchQuery.length);
    const modifiedFruit = (
      <div>
        {firstPart}
        <strong>{searchQuery}</strong>
        {lastPart}
      </div>
    );
    return modifiedFruit;
  };

  const output = filteredFruits.map((fruit) => (
    <li key={fruit}>{makeBold(fruit)}</li>
  ));
  const empty = <div>No data found</div>;

  return (
    <>
      <h1>Autocomplete</h1>
      <div className="card">
        <input type="text" onChange={deboundedHandleChange}></input>
      </div>
      <ul>
        {filteredFruits.length ? output : searchQuery !== '' ? empty : ''}
      </ul>
    </>
  );
}

export default App;
