"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { IoSearch } from 'react-icons/io5'
import { useDebouncedCallback } from 'use-debounce';

export default function Search() {

    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    const handleChange = useDebouncedCallback((term: string) => {
        console.log(term);
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query")
        }
        replace(`${pathName}?${params.toString()}`)
    }, 300);

    return (
        <div className='relative flex flex-1'>
            <input
                type="text"
                name=""
                id=""
                className='w-full border border-gray-200 py-2 pl-10 text-sm outline-2 rounded-sm'
                placeholder='Search...'
                onChange={(e) => handleChange(e.target.value)}
                defaultValue={searchParams.get("query")?.toString()} />
            <IoSearch className='absolute left-3 top-2 size-5 text-gray-500' />
        </div>
    )
}
