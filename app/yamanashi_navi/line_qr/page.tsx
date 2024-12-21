'use client'

import Image from 'next/image';
import {Container} from "@mui/material"

export default function Page(){

    return(
        <Container>
            <h1>LINE版　YamanashiNavi　QRコード</h1>
            <Image src='/YamanashiNavi_temp_line_account.png' alt="line qr" width={400} height={400} />
        </Container>
    );
};