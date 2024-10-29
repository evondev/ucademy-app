'use client';
import { allValue } from '@/shared/constants';
import { debounce } from 'lodash';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function useQueryString() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get('page')) || 1;
  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    if (value === '' || value === allValue) {
      params.delete(name);
    }
    router.push(`${pathname}?${params ? params.toString() : ''}`, {
      scroll: false,
    });
  };
  const handleSearchData = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      createQueryString('search', e.target.value);
    },
    250,
  );
  const handleSelectStatus = <T extends string>(status: T | string) => {
    createQueryString('status', status);
  };
  const handleChangePage = (page: number) => {
    createQueryString('page', `${page}`);
  };
  const handleChangeQs = (key: string, value: string) => {
    createQueryString(key, value);
  };
  return {
    createQueryString,
    router,
    pathname,
    handleSearchData,
    handleSelectStatus,
    handleChangePage,
    currentPage,
    handleChangeQs,
  };
}
