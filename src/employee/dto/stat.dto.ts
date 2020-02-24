export class StatItemDto {
  title: string;
  total: number;
}

export class StatDto {
  total: number;
  offices: StatItemDto[];
  tags: StatItemDto[];
}
