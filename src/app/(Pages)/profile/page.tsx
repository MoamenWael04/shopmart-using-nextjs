'use client';

import React, { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { AddressResponse } from '@/Interfaces';
import { getAddressAction } from '../products/_actions/getAddress.Action';
import { getUserToken } from '@/app/Helpers/GetUserToken';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Profile() {
  // Refs for Add Address
  const nameInput = useRef<HTMLInputElement>(null);
  const detailsInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const cityInput = useRef<HTMLInputElement>(null);

  // Refs for Change Password
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const rePasswordRef = useRef<HTMLInputElement>(null);

  const [addressResponse, setAddressResponse] = useState<AddressResponse | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const { data: session } = useSession();

  async function getAddress() {
    const data = await getAddressAction();
    if (data.status === 'success') {
      setAddressResponse(data);
    }
  }

  async function addAddress(e: React.FormEvent) {
    e.preventDefault();

    const Address = {
      name: nameInput.current?.value?.trim(),
      details: detailsInput.current?.value?.trim(),
      city: cityInput.current?.value?.trim(),
      phone: phoneInput.current?.value?.trim(),
    };

    if (!Address.name || !Address.details || !Address.city || !Address.phone) {
      toast.error('Please fill all fields');
      return;
    }

    const token = await getUserToken();
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/addresses', {
      method: 'POST',
      headers: {
        token: token!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Address),
    });

    const data = await response.json();

    if (data.status === 'success') {
      toast.success('Your new address is added', { position: 'bottom-left' });
      await getAddress();

      // Clear inputs
      nameInput.current!.value = '';
      detailsInput.current!.value = '';
      cityInput.current!.value = '';
      phoneInput.current!.value = '';
    } else {
      toast.error(data.message || 'Failed to add address');
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setIsChangingPassword(true);

    const currentPassword = currentPasswordRef.current?.value;
    const password = newPasswordRef.current?.value;
    const rePassword = rePasswordRef.current?.value;

    if (!currentPassword || !password || !rePassword) {
      toast.error('Please fill all fields');
      setIsChangingPassword(false);
      return;
    }

    if (password !== rePassword) {
      toast.error('New passwords do not match');
      setIsChangingPassword(false);
      return;
    }

    if (password.length < 6) {
      toast.error('New password must be at least 6 characters');
      setIsChangingPassword(false);
      return;
    }

    const token = await getUserToken();

    try {
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', {
        method: 'PUT',
        headers: {
          token: token!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          password,
          rePassword,
        }),
      });

      const data = await response.json();

      if (data.message === 'success' || data.token) {
        toast.success('Password changed successfully!', { position: 'bottom-left' });

        // Clear password fields
        currentPasswordRef.current!.value = '';
        newPasswordRef.current!.value = '';
        rePasswordRef.current!.value = '';
      } else {
        toast.error(data.message || 'Failed to change password');
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setIsChangingPassword(false);
    }
  }

  async function removeAddress(addressId: string) {
    const token = await getUserToken();
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`, {
      method: 'DELETE',
      headers: { token: token! },
    });

    const data = await response.json();

    if (data.status === 'success') {
      toast.success('Address deleted', { position: 'bottom-left' });
      await getAddress();
    } else {
      toast.error('Failed to delete address');
    }
  }

  React.useEffect(() => {
    getAddress();
  }, []);

  return (
    <div className="min-h-screen flex items-start justify-center bg-muted/40 p-6 gap-8">
      <div className="flex flex-col gap-6 w-80">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-lg w-full" variant="outline">
              Add address
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Address</DialogTitle>
              <DialogDescription>Enter your shipping address details</DialogDescription>
            </DialogHeader>

            <form onSubmit={addAddress} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" ref={nameInput} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" ref={cityInput}  />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="details">Details</Label>
                <Input id="details" ref={detailsInput}  />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" ref={phoneInput}  />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Add Address</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Change Password Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-lg w-full" variant="outline">
              Change password
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>Update your account password securely</DialogDescription>
            </DialogHeader>

            <form onSubmit={changePassword} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="current">Current Password</Label>
                <Input
                  id="current"
                  type="password"
                  ref={currentPasswordRef}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="new">New Password</Label>
                <Input
                  id="new"
                  type="password"
                  ref={newPasswordRef}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirm">Confirm New Password</Label>
                <Input
                  id="confirm"
                  type="password"
                  ref={rePasswordRef}
                />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline" disabled={isChangingPassword}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isChangingPassword}>
                  {isChangingPassword ? 'Changing...' : 'Change Password'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* User Info & Addresses Card */}
      <Card className="w-full max-w-md rounded-2xl">
        <CardHeader className="flex flex-col items-center gap-4">
          <CardTitle className="text-2xl">{session?.user?.name}</CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium">{session?.user?.email}</p>
        </CardContent>

        <CardContent className="space-y-4">
          <h3 className="font-semibold text-lg">Your Addresses</h3>
          {addressResponse?.data.length === 0 && (
            <p className="text-center text-muted-foreground">No addresses added yet</p>
          )}
          {addressResponse?.data.map((address, i) => (
            <div key={address._id} className="p-4 border rounded-lg space-y-2">
              <p className="font-semibold">Address #{i + 1}</p>
              <p>Name: {address.name}</p>
              <p>City: {address.city}</p>
              <p>Details: {address.details}</p>
              <p>Phone: {address.phone}</p>
              <div className="flex justify-end">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => removeAddress(address._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}