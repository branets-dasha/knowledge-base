# How to set up SSH on Windows to connect to GitHub


* [What is SSH & reasoning to use it for GitHub on Windows](#what-is-ssh--reasoning-to-use-it-for-github-on-windows-intro)
* [Enable OpenSSH on Windows](#enable-openssh-on-windows)
* [Generate SSH key](#generate-ssh-key)
* [Upload public key to GitHub](#upload-public-key-to-github)
* [Test SSH connection](#test-ssh-connection)
* [Turn on SSH Agent](#turn-on-ssh-agent)
* [Add the key to SSH Agent](#add-the-key-to-ssh-agent)
* [Delete the file with the private part of the key](#delete-the-file-with-the-private-part-of-the-key)
* [Test SSH connection again](#test-ssh-connection-again)
* [Teach git to use OpenSSH](#teach-git-to-use-openssh)
* [You're all set](#youre-all-set)
* [Bonus: Using multiple GitHub accounts](#bonus-using-multiple-github-accounts)

## What is SSH & reasoning to use it for GitHub on Windows

Git provides two ways to securely connect to remote repositories - HTTPS and SSH. How you connect depends on the URL.

HTTPS URL looks something like this: `https://github.com/{YourName}/{Repository}.git`  
And SSH URL looks something like this: `git@github.com:{YourName}/{Repository}.git`

With HTTPS protocol the authentication requires providing username and password (or a personal access token in case of GitHub).
With SSH protocol the authentication is done with the public/private key pair that the user doesn't need to type in manually. If you set it up correctly, you won't ever be seeing the prompts to enter your credentials.

While SSH is a familiar protocol for Linux users, it's not that common on Windows. Previously it required using 3rd-party tools, but lately Windows ships with OpenSSH, which is an open-source set of SSH tools.


## Enable OpenSSH on Windows

Go to `Apps & features` > `Optional features` and ensure `OpenSSH Client` is installed. If it is not, use the `Add a feature` button and install it.

⚙️ On Windows:  
> Apps & features > Optional features: OpenSSH Client


## Generate SSH key

Open windows terminal in your user folder (that's where it usually starts) and run the following command:

🖥️ Terminal: `C:\Users\{YourName}>`
```
ssh-keygen
```
The command will give you a few prompts. It's fine to accept the defaults (press `Enter`), unless you want to specify a different name for your key or provide additional security by adding a passphrase.

> Enter file in which to save the key (C:\Users\{YourName}/.ssh/id_rsa): ⏎  
> Enter passphrase (empty for no passphrase): ⏎  
> Enter same passphrase again: ⏎  

The command will generate two files. The one without an extension (`id_rsa` if you went with the default) is the private part of the key, don't ever share it with anyone or anything. The file with the `.pub` extension (`id_rsa.pub`) is the public part of the key - it's safe to share it, and it's the part that we shall give to GitHub.

<details>
<summary>Location gotchas</summary>

`%USERPROFILE%/.ssh` is the default location for SSH keys. If you've never generated SSH keys before, the `.ssh` folder probably doesnt exist yet.

If the `.ssh` folder doesn't exist and you answer to the location prompt with a relative path like `.ssh/github_rsa`, you'll likely get the error: 
> "Saving key ".ssh/github_rsa" failed: No such file or directory"

One possible solution is to copy the suggested location exactly only replacing the file name, leaving the slashes as they are: `C:\Users\{YourName}/.ssh/github_rsa`. This will create the missing folder in the process. Or, you can create the `.ssh` folder manually, or accept the defaults and then delete the generated key and re-run with the relative path.

I'm not sure what's going on with path resolution here. It's weird.
</details>


## Upload public key to GitHub

Go to GitHub (or your enterprise GitHub), click on your portrait, go to `Settings` > `SSH and GPG keys` and click on the `New SSH key` button. 

I think it's best to let each device of yours generate its own SSH key and never let the private part leave that device - avoid passing the keys around on USB sticks, in emails, etc. That means that you'll need to add a separate key for each device you SSH to GitHub from, so for the Title field use something that'll help you identify which device this key comes from. This way you'll have an easier time deleting irrelevant keys in the future.

For the key field copy the **public** part of your key here, i. e. the content of the file with the `.pub` extension.

⚙️ GitHub:  
> Settings > SSH and GPG keys > New SSH key  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Title: {Something to identify your machine}  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Key: {The public part of the generated key}  


## Test SSH connection

In order to test the SSH connection to GitHub, open the terminal and run the command:

🖥️ Terminal: 
```
ssh -T git@github.com
```

You'll see a message that the authenticity of host 'github.com' can't be established, and you'll be given a key fingerprint. Go to ["GitHub's SSH key fingerprints" page](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints) to verify the fingerprint. If it matches, type `yes`, and the github host will be saved - you won't have to verify it again in the future.

After you do all that you'll see: "Permission denied (publickey)". 

SSH doesn't know yet it should use that key you generated earlier. If you want to see the positive outcome now, you can specify the key in the command, but you can skip that, because further steps will eliminate the need to do it.

🖥️ Terminal: 
```
ssh -T git@github.com -i c:\Users\{YourName}\.ssh\id_rsa
```

The successful message will look like this: "You've successfully authenticated, but GitHub does not provide shell access".


## Turn on SSH Agent
SSH Agent helps you manage SSH keys, so that you don't need to manually specify them when issuing SSH commands. Using it adds convenience (and security), although is not strictly necessary.

Press the `Windows` key and start typing `Services` until you see the Services app in search results. Open the app. 

Locate `OpenSSH Authentication Agent` in the list. Set its startup type to Automatic so that it always starts with Windows. Start the service.

⚙️ On Windows:  
> Services > OpenSSH Authentication Agent  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Startup type: Automatic  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start


## Add the key to SSH Agent
Open windows terminal in your user folder and run the following command:

🖥️ Terminal: `C:\Users\{YourName}>`
```
ssh-add .ssh/id_rsa
```
(where `id_rsa` is the name of the key you generated earlier)  
This will add the generated key to SSH Agent. The Agent will take care of securely storing the key and using it in SSH commands.


## Delete the file with the private part of the key

Since the private key is now securely stored in the SSH Agent, you can delete the private file for increased security.


## Test SSH connection again
You can test SSH connection to GitHub again an confirm it now properly responds with "You've successfully authenticated, but GitHub does not provide shell access".

🖥️ Terminal: 
```
ssh -T git@github.com
```


## Teach git to use OpenSSH

Chances are your git uses its own embedded SSH tool, but we want it to use OpenSSH that we configured. To switch to OpenSSH use this comand:

🖥️ Terminal: 
```
git config --global core.sshCommand C:/Windows/System32/OpenSSH/ssh.exe
```


## You're all set

You can now grab SSH repository links from GitHub instead of HTTPS ones and use them in commands like `git clone`, and they should work without any additional authentication prompts.


## Bonus: Using multiple GitHub accounts

If you use multiple GitHub accounts you should create a seprate key for each identity (specify different key names when generating keys) and upload each key to its respective GitHub account. Add both keys to the SSH Agent.

When connecting to a host via SSH, the SSH Agent will pick the first key that works and remember to use it with this host.  But since different GitHub accounts have the same host name (github.com), SSH Agent will remember the first identity it successfully connected with and keep using it, regardless of which identity has access to the repository (or maybe both have access, but you want to control which one commits the changes).

To instruct the SSH Agent which key to use in each situation, create a file named `config` in the `.ssh` folder. Within the file create an entry for each GitHub account you use. Here is an example:

📄 `config`

```
# Default github account: personal
Host github.com
   HostName github.com
   IdentityFile ~/.ssh/github_personal_rsa
   IdentitiesOnly yes
   
# Other github account: work
Host github-work
   HostName github.com
   IdentityFile ~/.ssh/github_work_rsa
   IdentitiesOnly yes
```

Note how one entry defines an alias `github-work` for the host name `github.com`. Each entry has the respective key file specified. If you've deleted the private key files, it's not a problem - the `.ssh` folder only needs to contain the `.pub` files for this to work.

Now you can test each connection:

🖥️ Terminal: 
```
ssh -T git@github.com
```
```
ssh -T git@github-work
```

When grabbing a repo link from GitHub, substitute the host with respective alias if needed:

> `git@github.com:{PersonalAccountName}/{Repository}.git`  
>  
> `git@github-work:{WorkAccountName}/{Repository}.git`
