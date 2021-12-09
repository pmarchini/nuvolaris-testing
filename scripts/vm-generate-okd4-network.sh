#!/bin/bash
echo '''
<network>
  <name>okd4</name>
  <forward mode='\'nat\''>
    <nat>
      <port start='\'1024\'' end='\'65535\''/>
    </nat>
  </forward>
  <bridge name='\'okd4\'' stp='\'on\'' delay='\'0\''/>
  <domain name='\'okd4\''/>
  <ip address='\'192.168.100.1\'' netmask='\'255.255.255.0\''>
  </ip>
</network>
''' >> okd4-network.xml
