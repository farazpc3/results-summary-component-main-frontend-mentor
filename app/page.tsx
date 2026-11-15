import Image from 'next/image';
import ResultCard from './components/ResultCard';
import Summary from './components/Summary';

export default function Home() {
  return (
    <main className="flex flex-col items-center h-full w-full bg-custom-white lg:h-[500px] lg:w-[700px] lg:flex-row">
      <ResultCard />
      <Summary />
    </main>
  );
}
