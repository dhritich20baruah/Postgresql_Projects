import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    //Prisma Queries
    // const user = await prisma.user.create({
    //     data:{
    //         name: 'John Doe',
    //         email: 'john@email.com'
    //     }
    // })

    //Get
    // const users = await prisma.user.findMany()

    //Create article and associate it with user
    const article = await prisma.article.create({
        data: {
            title: "John's first article",
            body: "This is John's first article",
            author: {
                connect: {
                    id: 1,
                }
            }
        }
    });

    console.log(article)
}

main()
.then(async() => {
    await prisma.$disconnect();
})
.catch(async(e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})