"use client";

import { useState } from "react";
import { Pagination } from "@/components/ui/pagination";

export function PaginationDemo({ initial = 5, total = 12, siblings = 1 }: { initial?: number; total?: number; siblings?: number }) {
  const [page, setPage] = useState(initial);
  return <Pagination page={page} total={total} onChange={setPage} siblings={siblings} />;
}
