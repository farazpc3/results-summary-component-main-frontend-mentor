export default function ResultCard() {
  const score = 76;
  const resultLabel = {};
  const peoplePercentage = 65;
  return (
    <section className="bg-linear-to-b from-(--color-light-slate-blue) to-(--color-light-royal-blue) text-(--color-custom-white) w-full flex flex-col items-center gap-1 pb-6 rounded-b-3xl lg:rounded-bl-none lg:rounded-r-3xl lg:h-full lg:self-stretch lg:justify-around">
      <h2 className="text-(--light-lavender) mt-4">Your Result</h2>
      <div className="bg-linear-to-b from-(--violet-blue) to-(--persian-blue) min-w-fit aspect-square flex flex-col items-center p-8 rounded-full text-(--color-custom-white) ">
        <div className="text-(--color-custom-white) text-4xl font-bold">
          {score}
        </div>

        <div className="text-(--light-lavender) text-xs"> of 100</div>
      </div>
      <h3>Great</h3>
      <p className="text-(--light-lavender) px-12 text-xs text-center">
        You scored higher than {peoplePercentage}% of the people who have taken
        these tests.{' '}
      </p>
    </section>
  );
}
