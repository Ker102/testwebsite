# 🚨 SECURITY BREACH RECOVERY GUIDE

**Date**: October 18, 2025  
**Status**: 🔴 CRITICAL - Immediate Action Required

## Summary

**TWO API KEYS WERE EXPOSED** in your public GitHub repository at `https://github.com/Ker102/testwebsite.git`

### Compromised Keys:
1. **Brave Search API Key**: `BSA4-kZJHm3EgAIO36EgVs7FrBwWotZ`
2. **Firecrawl API Key**: `Fc-8ed8cb64489b479cbdae285107f52881`

### Where They Were Exposed:
- Git commit history (multiple commits)
- Documentation files (MCP_CONFIGURATION_SUMMARY.md, firecrawl-api.md)
- **Publicly accessible on GitHub**

## ⚠️ CRITICAL: DO THESE IMMEDIATELY (IN ORDER)

### Step 1: ROTATE API KEYS NOW ⚡

**This is the MOST IMPORTANT step. Do this RIGHT NOW before anything else.**

#### Rotate Brave Search API Key:
1. Go to: https://brave.com/search/api/
2. Log in to your account
3. Find the key: `BSA4-kZJHm3EgAIO36EgVs7FrBwWotZ`
4. **DELETE/REVOKE** this key immediately
5. Generate a **NEW** API key
6. Update your `.env.local` file with the new key:
   ```bash
   BRAVE_API_KEY=your_new_brave_key_here
   ```

#### Rotate Firecrawl API Key:
1. Go to: https://firecrawl.dev
2. Log in to your account  
3. Find the key: `Fc-8ed8cb64489b479cbdae285107f52881`
4. **DELETE/REVOKE** this key immediately
5. Generate a **NEW** API key
6. Update your `.env.local` file with the new key:
   ```bash
   FIRECRAWL_API_KEY=your_new_firecrawl_key_here
   ```

### Step 2: Clean Git History 🧹

The keys are still in your Git history even though we removed them from current files. You MUST rewrite history.

#### Option A: Use BFG Repo-Cleaner (RECOMMENDED - Easier)

1. **Install BFG Repo-Cleaner:**
   ```bash
   # On Ubuntu/Debian
   sudo apt-get install bfg
   
   # Or download from: https://rtyley.github.io/bfg-repo-cleaner/
   ```

2. **Create a file with the strings to remove:**
   ```bash
   cd /home/mint/Desktop/cursor-projects/testprojects/testproject1/testwebsite/next-app
   
   cat > passwords.txt << 'EOF'
   BSA4-kZJHm3EgAIO36EgVs7FrBwWotZ
   Fc-8ed8cb64489b479cbdae285107f52881
   fc-8ed8cb64489b479cbdae285107f52881
   EOF
   ```

3. **Run BFG to clean the repository:**
   ```bash
   # Make a backup first!
   cd ..
   cp -r next-app next-app-backup
   
   cd next-app
   
   # Clean with BFG
   bfg --replace-text passwords.txt .git
   ```

4. **Clean up and force push:**
   ```bash
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   
   # Force push to GitHub (THIS WILL REWRITE HISTORY)
   git push origin --force --all
   git push origin --force --tags
   ```

#### Option B: Use git filter-repo (Alternative)

1. **Install git-filter-repo:**
   ```bash
   pip3 install git-filter-repo
   ```

2. **Create expressions file:**
   ```bash
   cat > expressions.txt << 'EOF'
   regex:BSA4-kZJHm3EgAIO36EgVs7FrBwWotZ==>***REMOVED***
   regex:Fc-8ed8cb64489b479cbdae285107f52881==>***REMOVED***
   regex:fc-8ed8cb64489b479cbdae285107f52881==>***REMOVED***
   EOF
   ```

3. **Run filter-repo:**
   ```bash
   git filter-repo --replace-text expressions.txt --force
   ```

4. **Force push:**
   ```bash
   git remote add origin https://github.com/Ker102/testwebsite.git
   git push origin --force --all
   git push origin --force --tags
   ```

#### Option C: Nuclear Option - Delete and Recreate Repository

If the above seems too complex:

1. **Delete the GitHub repository** at https://github.com/Ker102/testwebsite
2. **Create a fresh repository**
3. **Start with clean history:**
   ```bash
   cd /home/mint/Desktop/cursor-projects/testprojects/testproject1/testwebsite/next-app
   
   # Remove git history
   rm -rf .git
   
   # Initialize fresh repository
   git init
   git add .
   git commit -m "Initial commit (cleaned history)"
   
   # Connect to new GitHub repo
   git remote add origin https://github.com/Ker102/testwebsite.git
   git branch -M main
   git push -u origin main
   ```

### Step 3: Verify Keys Are Removed ✅

After cleaning, verify the keys are gone:

```bash
# Search for Brave key
git log --all -S "BSA4-kZJHm3EgAIO36EgVs7FrBwWotZ" --oneline

# Search for Firecrawl key
git log --all -S "fc-8ed8cb64489b479cbdae285107f52881" --oneline

# Both should return NOTHING
```

### Step 4: Update .gitignore (Already Done) ✅

Your `.gitignore` already has:
```
.env*
```

This will prevent `.env.local` from being committed in the future.

### Step 5: Check for Unauthorized Usage 📊

After rotating keys, check if there was any unauthorized usage:

**Brave Search:**
- Check your Brave API dashboard for unusual activity
- Look at API call logs and usage statistics

**Firecrawl:**
- Check your Firecrawl dashboard for unusual activity
- Review billing/usage to see if someone used your key

### Step 6: Set Up Secrets Scanning (Future Prevention) 🛡️

1. **Enable GitHub Secret Scanning:**
   - Go to: https://github.com/Ker102/testwebsite/settings/security_analysis
   - Enable "Secret scanning"
   - GitHub will alert you if secrets are detected

2. **Use git-secrets locally:**
   ```bash
   # Install git-secrets
   sudo apt-get install git-secrets
   
   cd /home/mint/Desktop/cursor-projects/testprojects/testproject1/testwebsite/next-app
   
   # Initialize git-secrets
   git secrets --install
   git secrets --register-aws
   
   # Add patterns for your API keys
   git secrets --add 'BRAVE_API_KEY.*'
   git secrets --add 'FIRECRAWL_API_KEY.*'
   git secrets --add '[A-Z]{3,5}-[a-zA-Z0-9]{20,}'
   ```

3. **Use pre-commit hooks:**
   ```bash
   # Install pre-commit
   pip3 install pre-commit
   
   # Create .pre-commit-config.yaml
   cat > .pre-commit-config.yaml << 'EOF'
   repos:
     - repo: https://github.com/Yelp/detect-secrets
       rev: v1.4.0
       hooks:
         - id: detect-secrets
           args: ['--baseline', '.secrets.baseline']
   EOF
   
   # Install hooks
   pre-commit install
   ```

## ✅ Checklist

Mark these off as you complete them:

- [ ] **CRITICAL**: Rotated Brave Search API key
- [ ] **CRITICAL**: Rotated Firecrawl API key
- [ ] Updated `.env.local` with new keys
- [ ] Chose a Git history cleaning method (A, B, or C)
- [ ] Cleaned Git history using chosen method
- [ ] Force pushed cleaned history to GitHub
- [ ] Verified keys are removed from Git history
- [ ] Checked for unauthorized API usage
- [ ] Enabled GitHub secret scanning
- [ ] Set up local secrets protection (git-secrets or pre-commit)
- [ ] Tested that app still works with new keys

## 📋 Commands Summary

```bash
# 1. Rotate keys (do this first!)
# Visit websites and rotate keys manually

# 2. Clean with BFG (easiest)
cat > passwords.txt << 'EOF'
BSA4-kZJHm3EgAIO36EgVs7FrBwWotZ
Fc-8ed8cb64489b479cbdae285107f52881
fc-8ed8cb64489b479cbdae285107f52881
EOF

bfg --replace-text passwords.txt .git
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push origin --force --all

# 3. Verify
git log --all -S "BSA4-kZJHm3EgAIO36EgVs7FrBwWotZ" --oneline
git log --all -S "fc-8ed8cb64489b479cbdae285107f52881" --oneline
```

## ⚠️ Important Notes

1. **Force pushing rewrites history** - Anyone who cloned your repo will need to re-clone
2. **Backup before cleaning** - Always make a backup of your repo first
3. **Keys are compromised even if unused** - Rotate them regardless
4. **Future prevention** - Use environment variables, never commit keys
5. **Check billing** - Monitor both API accounts for unexpected charges

## 🆘 Need Help?

If you're unsure about any step:
1. Make a backup of your repository first
2. Try the "Nuclear Option" (delete and recreate)
3. It's safer to start fresh than to leave keys exposed

## ✅ What We Already Did

1. ✅ Removed keys from current files (MCP_CONFIGURATION_SUMMARY.md, firecrawl-api.md)
2. ✅ Committed the removal
3. ✅ Created this guide

## ⏭️ What You Need to Do

1. ⚠️ **ROTATE BOTH API KEYS IMMEDIATELY**
2. ⚠️ **CLEAN GIT HISTORY**
3. ⚠️ **FORCE PUSH TO GITHUB**

---

**Do not delay on Step 1 and 2. The keys are publicly accessible RIGHT NOW on GitHub.**

**Last Updated**: October 18, 2025

