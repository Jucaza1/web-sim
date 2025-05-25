#!/bin/bash

if [ -z "$1" ]; then
    echo "Provide device name for the EBS volume"
    echo "lsblk (to find the device name)"
    exit 1
fi
# regex to check if the device name is valid
if [[ ! "$1" =~ ^/dev/[a-z0-9]+$ ]]; then
    echo "Invalid device name. Please provide a valid EBS volume device name (e.g., /dev/xvdf)."
    echo "lsblk (to find the device name)"
    exit 1
fi
DEVICE=$1
MOUNT_POINT=/persistance

# Create mount point
mkdir -p $MOUNT_POINT
if [ $? -ne 0 ]; then
    echo "Failed to create mount point $MOUNT_POINT"
    exit 1
fi

# # Format the disk if not already formatted
# file -s $DEVICE | grep ext4 || mkfs -t ext4 $DEVICE

# Mount it
mount $DEVICE $MOUNT_POINT
# Check if the mount was successful
if [ $? -ne 0 ]; then
    echo "Failed to mount $DEVICE at $MOUNT_POINT"
    exit 1
fi

# Add to fstab if not already there
grep -q "$DEVICE" /etc/fstab || echo "$DEVICE $MOUNT_POINT ext4 defaults,nofail 0 2" >> /etc/fstab
