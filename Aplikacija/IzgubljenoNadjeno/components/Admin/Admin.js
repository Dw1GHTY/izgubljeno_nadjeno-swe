import { DatabaseIcon, PresentationChartLineIcon, UserGroupIcon } from "@heroicons/react/outline";
import styles from "../../styles/admin.module.css";
import inLogo from "../../public/inLogo.png";
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import MenuItem from "./MenuItem.js";
import Grafici from "./Grafici";
import Link from 'next/link';
import {ArrowLeftIcon} from "@heroicons/react/outline";


export default function Admin({ slikaKorisnika, setKorisnici, setOglasi, setGrafike }) {


    function base() {
        setKorisnici(false);
        setOglasi(true);
        setGrafike(false);
    }

    function prez() {
        setKorisnici(false);
        setOglasi(false);
        setGrafike(true);
    }

    function ppl() {
        setKorisnici(true);
        setOglasi(false);
        setGrafike(false);
    }


    return (<div className={styles.adminovaKartica}>
        
        <div className={styles.sidebarLogo}>
            <Image style={{ borderRadius: '50%', margin: '0' }} width="70" height="70" alt="" src={inLogo} />
        </div>
        <div className={styles.Menu} >
            <div style={{ padding: '0', margin: '0' }} onClick={prez} >
                <MenuItem text="Statistika" Icon={PresentationChartLineIcon} />
            </div>
            <div style={{ padding: '0', margin: '0' }} onClick={base} >
                <MenuItem text="Oglasi" Icon={DatabaseIcon} />
            </div>
            <div style={{ padding: '0', margin: '0' }} onClick={ppl} >
                <MenuItem text="Korisnici" Icon={UserGroupIcon} />
            </div>
            <Link href='/' style={{ "text-decoration":"none"}}className={styles.MenuItemLabel}>
            <div style={{ padding: '0', margin: '0' }}  >
                <div className={styles.MenuItem}>
                <ArrowLeftIcon className={styles.Icon}/>
                <span className={styles.nestani}>Nazad</span>
                </div>
            </div>
            </Link>
            

        </div>
        {
            (slikaKorisnika && (
                <div>
                    <div className={styles.slikaDiv} style={{
                        width: '10vw',
                        height: '10vw',
                        backgroundImage: `url(${slikaKorisnika})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}>
                    </div>


                </div>

            ))

        }
    </div>);
}