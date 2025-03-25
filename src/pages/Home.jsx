import FetchData from "../Components/FetchData";

export default function Home() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>
          Weather Application
        </h1>
      </header>
      <main>
        <FetchData />
      </main>
    </div>
  );
}