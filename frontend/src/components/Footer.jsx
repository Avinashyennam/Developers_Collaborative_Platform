import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faXTwitter, faWhatsapp, faLinkedin } from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
    return (
        <div className="flex flex-col gap-10 px-36 py-20">
            <div className="flex justify-around items-center">
                <div>
                    <img src="/logo-black.png" alt="not found" width={150} height={100} />
                </div>
                <div>
                    <ul className="flex gap-10">
                        <Link to="/"><li>Home</li></Link>
                        <Link to="/blogs"><li>Posts</li></Link>
                        <Link to="/matches"><li>Matches</li></Link>
                        <Link to="/connections"><li>Connections</li></Link>
                        <Link to="/pendingconnections"><li>Pending Connections</li></Link>
                    </ul>
                </div>
                <div className="flex gap-3">
                    <FontAwesomeIcon icon={faInstagram} />
                    <FontAwesomeIcon icon={faXTwitter} />
                    <FontAwesomeIcon icon={faWhatsapp} />
                    <FontAwesomeIcon icon={faLinkedin} />
                </div>
            </div>
            <div className="border border-slate-700"></div>
            <div className="flex justify-evenly">
                <p>
                    © 2024 Collab. All rights reserved. Connecting developers 
                    worldwide for better collaboration and learning.
                </p>
                <p>Terms of service</p>
                <p>Privacy policy</p>
            </div>
        </div>
    )
}

export default Footer;