import { useState } from 'react';
import { Button } from '@/components/shadcn/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/shadcn/dialog';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { useLicenseStorage } from '@/hooks/use-storage';
import { cn } from '@/utils/shadcn';
import PageLogo from '/pagelogo.svg';

export function HeaderLogo({ className }: React.ComponentProps<'a'>) {
  const email = useLicenseStorage(state => state.email);
  const username = useLicenseStorage(state => state.username);
  const expiryDate = useLicenseStorage(state => state.expiryDate);
  const setEmail = useLicenseStorage(state => state.setEmail);
  const setUsername = useLicenseStorage(state => state.setUsername);
  const setExpiryDate = useLicenseStorage(state => state.setExpiryDate);

  // Used to save new data
  const [localEmail, setLocalEmail] = useState(email);
  const [localUsername, setLocalUsername] = useState(username);
  const [localExpiryDate, setLocalExpiryDate] = useState(expiryDate);

  const handleSaveChange = () => {
    setEmail(localEmail);
    setUsername(localUsername);
    setExpiryDate(localExpiryDate);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn('flex items-center gap-2 h-full bg-transparent hover:bg-accent-foreground/10 cursor-pointer select-none', className)}>
          <img src={PageLogo} alt="Website logo" className="size-10 min-w-10 min-h-10" />
          <span className="text-2xl font-bold text-foreground/80 hidden md:block">
            JetBrains License Generator
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Personalize Information</DialogTitle>
          <DialogDescription>
            Set personal information for the product license here,
            which can be useful for some users
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="inline-grid grid-cols-4 gap-4 justify-items-end-safe">
            <Label htmlFor="email" className="col-span-1">Email: </Label>
            <Input id="email" name="email" className="col-span-3" defaultValue={email} onChange={event => setLocalEmail(event.target.value)} />
          </div>
          <div className="inline-grid grid-cols-4 gap-4 justify-items-end-safe">
            <Label htmlFor="username" className="col-span-1">Username: </Label>
            <Input id="username" name="username" className="col-span-3" defaultValue={username} onChange={event => setLocalUsername(event.target.value)} />
          </div>
          <div className="inline-grid grid-cols-4 gap-4 justify-items-end-safe">
            <Label htmlFor="expiry-date" className="col-span-1">ExpiryDate: </Label>
            <Input id="expiry-date" name="expiry-date" className="col-span-3" defaultValue={expiryDate} type="date" onChange={event => setLocalExpiryDate(event.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleSaveChange}>
              Save Changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
