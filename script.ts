//Import prisma client after migration and initiation
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



async function main(){

  const allUsers = await prisma.user.deleteMany();
  console.log(allUsers);
  
  const user = await prisma.user.create({
    data: {
      name: "Charlie",
      email: "Charlie@gmail.com",
      userPref: {
        create: {
          emailNews: true
        }
      }
    },
    include: {
      userPref: true
    }
  });
  
  console.log(user);
  
}

//Function to log error msg or disconnect whenever our code finishes running
main()
  .catch(e => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });