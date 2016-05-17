# imobso
Is My Open Bazaar Server Online?


A public web service with REST API to check whether or not your openbazaar store is online. See it in action at (https://www.myopenbazaar.top/)[https://myopenbazaar.top]


## Administrative tasks

### deploy app to server

install ansible dependencies

    ansible-galaxy install -r requirements.txt

deploy to server

    ansible-playbook -i ~/.ansible-inventory --vault-password-file ~/.ansible-vault-password ./main.yml


### update SSL certificate

    ansible-playbook -i ~/.ansible-inventory --vault-password-file ~/.ansible-vault-password ./ssl.yml



## Example use cases

  * monitor your store's uptime using infrastructure monitoring software
  * check that your home router's port forwarding is properly configured
