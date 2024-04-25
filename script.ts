//Import prisma client after migration and initiation
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function main(){

  const allUsers = await prisma.user.deleteMany();
  console.log(allUsers);

  console.log("-----------------------------------------------------");
  const createdUser = await prisma.user.create({
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
  console.log(createdUser);
  console.log("--------------------------------------------------------------");

  const createdUsers = await prisma.user.createMany({
    data: [{
      name: "Bill",
      email: "Bill@gmail.com",
    }, 
    {
      name: "Tommy",
      email: "Tommy@yahoo.com",
    }, 
    {
      name: "Tommy",
      email: "Tommy2@fillerino.com",
    }, 
    {
      name: "Tommy",
      email: "Tommy3@gogle.com",
    }
    ]
  });
  console.log(createdUsers);
  console.log("--------------------------------------------------------------");

  const getAllUsers = await prisma.user.findMany();
  console.log(getAllUsers);

  const getAllTommyUsers = await prisma.user.findMany({
    where: {
      name: "Tommy"
    },
    distinct: "email"
  });
  console.log(getAllTommyUsers);
  console.log("-------------------------");

  const getTommy = await prisma.user.findMany({
    where: {
      name: "Tommy"
    },
    take: 2,
    skip: 1,
  });
  console.log(getTommy);
  console.log("------------------------");

  const getUsers = await prisma.user.findMany({
    where: {
      name: { in: ["Bill", "Charlie", ]}
    },
  });
  console.log(getUsers);
  console.log("------------------------");

  const getUsers2 = await prisma.user.findMany({
    where: {
      AND: [{ email: {startsWith: "Cha", endsWith: "@%"}, name: "Charlie" }]
    },
  });
  console.log(getUsers2);
  console.log("------------------------");
  
  const getUniqueUser = await prisma.user.findUnique({
    where: {
      email: "Bill@gmail.com"
    },
    include: {
      userPref: true
    }
  });
  console.log(getUniqueUser);
  console.log("--------------------------------------------------------------");

  const updateUser = await prisma.user.update({
    where: {
      email: "Bill@gmail.com"
    },
    data: {
      email: "Bill@yahoo.com"
    }
  });
  console.log(updateUser);
  console.log("--------------------------------------------------------------");
}


//Function to log error msg or disconnect whenever our code finishes running
main()
  .catch(e => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });