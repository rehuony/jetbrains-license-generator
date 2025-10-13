export function CardIDE(props: IDEDataItem) {
  return (
    <article className="w-5/6 rounded-lg shadow-xl bg-card-foreground/5 shadow-card-foreground/20 select-none">
      <header className="flex items-center justify-between px-4 border-b-1">
        <span className="size-16 translate-y-1/2">
          <img src={props.icon} alt={`${props.name}'s logo`} className="size-full no-drag" />
        </span>
        <span className="text-sm text-card-foreground/50 rounded-full border cursor-pointer hover:text-card-foreground/80 hover:border-ring">
          <a href={props.link} target="_blank" rel="noopener noreferrer" className="block px-8 py-2 ">
            official
          </a>
        </span>
      </header>
      <section className="flex flex-col gap-8 px-4 pt-8 pb-4">
        <span className="text-2xl font-mono font-light truncate translate-y-1/2">
          {props.name}
        </span>
        <span className="relative text-left text-sm text-wrap wrap-anywhere group">
          <span className="text-card-foreground/50 group-hover:invisible">
            {'*'.repeat(126)}
          </span>
          <span className="invisible absolute left-0 top-0 flex items-center justify-center size-full rounded-full font-light text-card-foreground/80 group-hover:visible group-hover:bg-card-foreground/10">
            Copy to clipboard
          </span>
        </span>
      </section>
    </article>
  );
}
