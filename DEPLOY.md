# Tradie Quiz VPS Deployment Guide

## 1. Create DigitalOcean Account
1. Go to https://digitalocean.com
2. Sign up with email (gets $200 credit for 60 days)
3. Verify email

## 2. Create Droplet
1. Go to DigitalOcean Dashboard → Create → Droplets
2. Choose region: **Sydney** (closest to Australia)
3. Choose image: **Ubuntu 22.04 (LTS)**
4. Choose size: **Basic** → **$6/mo** (1GB RAM, 1 vCPU, 25GB SSD)
5. Add SSH key: (skip for now - password auth works)
6. Hostname: `tradie-quiz`
7. Click **Create Droplet**
8. Wait 1-2 min for it to provision

## 3. Get Server IP
After creation, you'll see the IP address. Example: `164.92.187.123`

## 4. SSH Access (from your Mac Terminal)
```bash
ssh root@164.92.187.123
```
(Use the actual IP from step 3)

When prompted, set a password (write it down - you'll need it).

## 5. What I'll Handle After You Give Me SSH Access

Once you give me the server IP and password, I'll:
1. SSH into the server
2. Install Node.js, pnpm, and dependencies
3. Clone the repo: https://github.com/ddjesseai-prog/tradie-archetype-quiz
4. Set up the .env file
5. Build and start the app on port 3000
6. Install nginx as reverse proxy (port 80 → 3000)
7. Confirm it's publicly reachable

## 6. DNS Record for tradiequiz.com

After I confirm the server is live, you'll update Cloudflare DNS:

| Type | Name | Value |
|------|------|-------|
| A | tradiequiz.com | YOUR_SERVER_IP |

---

**Ready?** Give me:
1. The server IP from DigitalOcean
2. The root password you set