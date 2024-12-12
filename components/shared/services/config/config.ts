"use client";
import { Metadata } from "next";
import redis from "../../../../app/api/redis/route";
import { useEffect, useState } from "react";
import { setConfig } from "next/config";

type Seo = {
    pageTitle: string
    pageDescription: string;
}

export const Config = () => {
    const [seo, setSeo] = useState<Seo>(
        {
            pageTitle: "title",
            pageDescription: "description"
        }
    )

    useEffect(() => {
        setConfig()
    }, [])

    const setConfig = async () => {
        setSeo({pageTitle: await redis.get("page_title"), pageDescription: await redis.get("page_description")})
    }
};