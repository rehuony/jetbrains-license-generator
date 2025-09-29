type UnionToIntersection<U> = (U extends any
  ? (x: U) => void
  : never) extends (x: infer R) => void ? R : never;

type LastUnionItem<U> = UnionToIntersection<U extends any
  ? (x: U) => void
  : never> extends (x: infer R) => void ? R : never;

type UnionToTuple<U, T extends any[] = []> = [U] extends [never]
  ? T
  : UnionToTuple<Exclude<U, LastUnionItem<U>>, [LastUnionItem<U>, ...T]>;
