'use client'

import { useEffect, useState } from 'react'
import qrcode from 'qrcode'
import { useSession } from 'next-auth/react';

export default function QRCard() {
    const [qr, setQr] = useState<string | null>(null)
    const session = useSession();
    const user = session?.data?.user;
    const id = user?.id || "";
    useEffect(() => {
        qrcode.toDataURL(id).then(setQr)
    }, [id])

    return (
        <div className="flex flex-col items-center ">
            {qr ? (
                <img
                    src={qr}
                    alt={`QR Code for ${id}`}
                    className="w-48 h-48 mb-4"
                />
            ) : (
                <span className='loading loading-spinner loading-xl'></span>
            )}
            <p className="text-center text-sm text-gray-600 break-all">{id}</p>
        </div>
    )
}
