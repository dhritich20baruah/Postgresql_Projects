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
    // const article = await prisma.article.create({
    //     data: {
    //         title: "John's first article",
    //         body: "This is John's first article",
    //         author: {
    //             connect: {
    //                 id: 1,
    //             }
    //         }
    //     }
    // });

    // const user = await prisma.user.create({
    //     data:{
    //         name: 'Sara Smith',
    //         email: 'sara@gmail.com',
    //         articles: {
    //             create: {
    //                 title: "Sara's first article",
    //                 body: "This is Sara's first article",  
    //             }
    //         }
    //     }
    // })

    //Get all articles
    // const articles = await prisma.article.findMany()

    //Get user as well as article
    // const users = await prisma.user.findMany({
    //     include:{
    //         articles: true
    //     }
    // })

    // users.forEach((user)=>{
    //     console.log(`User: ${user.name}, Email: ${user.email}`);
    //     console.log('Articles:');
    //     user.articles.forEach((article)=>{
    //         console.log(`-Title: ${article.title}, Body: ${article.body}`)
    //     });
    //     console.log('\n')
    // })

    //UPDATE
    // const user = await prisma.user.update({
    //     where: {
    //         id: 1,
    //     },
    //     data: {
    //         name: 'John Doe Jr.'
    //     }
    // });
    // console.log(user)

    //DELETE
    // const article = await prisma.article.delete({
    //     where: {
    //         id: 2
    //     }
    // })

    const articles = await prisma.article.findMany()

    console.log(articles)
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

//FOR PRISMA STUDIO RUN
//npx prisma studio