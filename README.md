# imobso
Is My Open Bazaar Server Online?

[![Build Status](https://travis-ci.org/insanity54/imobso.svg?branch=master)](https://travis-ci.org/insanity54/imobso)

A public web service with REST API to check whether or not your openbazaar store is online. See it in action at https://www.myopenbazaar.top/


## Administrative tasks

(from the `ansible` directory)

### deploy app to server

install ansible dependencies

    ansible-galaxy install -r requirements.txt

deploy to server

    ansible-playbook -i ~/.ansible-inventory --vault-password-file ~/.ansible-vault-password ./main.yml


### update SSL certificate

    ansible-playbook -i ~/.ansible-inventory --vault-password-file ~/.ansible-vault-password ./ssl.yml



## Example use cases

  * Do a quick check to see if your store is online without needing to enter the [Slack](https://openbazaar.slack.com/) chat.
  * Monitor your store's uptime using a simple HTTP request from your infrastructure monitoring software
  * Check that your home router's port forwarding is properly configured


## Roadmap

* [ ] allow onename lookups in place of guid [#1](https://github.com/insanity54/imobso/issues/1)
