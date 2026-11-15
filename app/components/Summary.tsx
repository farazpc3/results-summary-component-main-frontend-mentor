import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Summary() {
  const summaryData = [
    {
      category: 'Reaction',
      score: 80,
      icon: '/icon-reaction.svg',
      color: 'text-(--color-light-red)',
      bg: 'bg-[#fff5f5]',
    },
    {
      category: 'Memory',
      score: 92,
      icon: '/icon-memory.svg',
      color: 'text-(--color-orangey-yellow)',
      bg: 'bg-[#fffaf2]',
    },
    {
      category: 'Verbal',
      score: 61,
      icon: '/icon-verbal.svg',
      color: 'text-(--color-green-teal)',
      bg: 'bg-[#f2fffc]',
    },
    {
      category: 'Visual',
      score: 73,
      icon: '/icon-visual.svg',
      color: 'text-(--color-cobalt-blue)',
      bg: 'bg-[#f7f8ff]',
    },
  ];
  return (
    <section className="p-6 w-full flex flex-col gap-2">
      <h2 className="font-bold">Summary</h2>
      <ul className="list-none p-0 m-0 mb-4 flex flex-col gap-2">
        {summaryData.map((item) => (
          <li
            className={`${item.bg} ${item.color} flex flex-row justify-between items-center p-4 rounded-xl`}
            key={item.category}
          >
            <div className="flex gap-2">
              <Image
                src={item.icon}
                alt={`${item.category} icon`}
                width="20"
                height="20"
              />
              <span className="justify-self-start">{item.category}</span>
            </div>
            <data value="{item.score}">{`${item.score} / 100`}</data>
          </li>
        ))}
      </ul>
      <Button className="rounded-4xl text-(--color-custom-white) p-6 hover:bg-(--color-light-royal-blue)">
        Continue
      </Button>
    </section>
  );
}
