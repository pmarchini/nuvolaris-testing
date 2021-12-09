#!/bin/bash

virt-install \
--name $1 \
--ram 1024 \
--disk path=/var/lib/libvirt/images/centos7.qcow2,size=8 \
--vcpus 1 \
--os-type linux \
--os-variant centos7.0 \
--network bridge=vmbr0 \
--graphics none \
--console pty,target_type=serial \
--location 'http://mirror.i3d.net/pub/centos/7/os/x86_64/' \
--initrd-inject preseed.cfg \
--extra-args="ks=file:/preseed.cfg console=tty0 console=ttyS0,1152000"
