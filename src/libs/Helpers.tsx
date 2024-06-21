import mongoose from "mongoose";
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import DevicesIcon from '@mui/icons-material/Devices';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import HouseIcon from '@mui/icons-material/House';
export async function connect() {
    return mongoose.connect(process.env.MONGODB_URL as string);
}


export const categories = [
  { key: 'Cars', label: 'Cars', icon: TimeToLeaveIcon },
  { key: 'Electronics', label: 'Electronics', icon: DevicesIcon },
  { key: 'Clothes', label: 'Clothes', icon: CheckroomIcon},
  { key: 'Properties', label: 'properties', icon: HouseIcon }

]