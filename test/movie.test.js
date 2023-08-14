const request = require("supertest")
const app = require("../server")
const {sequelize} = require("../models")
const {queryInterface} = sequelize

afterAll((done) => {
    queryInterface.bulkDelete('Movies', null, {})
    .then(() => done())
    .catch((err) => {
        throw err
    })
})

let id
let trueInput = {
    title: "Pengabdi Setan 2 Comunion",
    image: "", 
    description: "adalah sebuah film horor Indonesia tahun 2022 yang disutradarai dan ditulis oleh Joko Anwar sebagai sekuel dari film tahun 2017, Pengabdi Setan", 
    rating: 7.0
}
let nulTitle = {
    image: "", 
    description: "adalah sebuah film horor Indonesia tahun 2022 yang disutradarai dan ditulis oleh Joko Anwar sebagai sekuel dari film tahun 2017, Pengabdi Setan", 
    rating: 7.0
}
let nulRating = {
    title: "Pengabdi Setan 2 Comunion",
    image: "", 
    description: "adalah sebuah film horor Indonesia tahun 2022 yang disutradarai dan ditulis oleh Joko Anwar sebagai sekuel dari film tahun 2017, Pengabdi Setan", 
}
let falseValueTitle = {
    title: 99,
    image: "", 
    description: "adalah sebuah film horor Indonesia tahun 2022 yang disutradarai dan ditulis oleh Joko Anwar sebagai sekuel dari film tahun 2017, Pengabdi Setan", 
    rating: 7.0
}
let falseValueImage = {
    title: "Pengabdi Setan 2 Comunion",
    image: 99, 
    description: "adalah sebuah film horor Indonesia tahun 2022 yang disutradarai dan ditulis oleh Joko Anwar sebagai sekuel dari film tahun 2017, Pengabdi Setan", 
    rating: 7.0
}
let falseValueDescription = {
    title: "Pengabdi Setan 2 Comunion",
    image: "", 
    description: 99, 
    rating: 7.0
}
let falseValuerating = {
    title: "Pengabdi Setan 2 Comunion",
    image: "", 
    description: "adalah sebuah film horor Indonesia tahun 2022 yang disutradarai dan ditulis oleh Joko Anwar sebagai sekuel dari film tahun 2017, Pengabdi Setan", 
    rating: "7.0"
}
let ratingBelow = {
    title: "Pengabdi Setan 2 Comunion",
    image: "", 
    description: "adalah sebuah film horor Indonesia tahun 2022 yang disutradarai dan ditulis oleh Joko Anwar sebagai sekuel dari film tahun 2017, Pengabdi Setan", 
    rating: -7.0
}
let ratingAbove = {
    title: "Pengabdi Setan 2 Comunion",
    image: "", 
    description: "adalah sebuah film horor Indonesia tahun 2022 yang disutradarai dan ditulis oleh Joko Anwar sebagai sekuel dari film tahun 2017, Pengabdi Setan", 
    rating: 17.0
}

describe('POST /Movies', () => {
    it("give null title, returning error", (done) => {
        request(app)
        .post("/Movies")
        .send(nulTitle)
        .then(({status, body}) => {
            expect(status).toBe(404)
            expect(body.error[0]).toContain('Incomplete Data, please check and complete inputted data')
            done()
        })
    })

    it("give null rating, returning error", (done) => {
        request(app)
        .post("/Movies")
        .send(nulRating)
        .then(({status, body}) => {
            expect(status).toBe(404)
            expect(body.error[0]).toContain('Incomplete Data, please check and complete inputted data')
            done()
        })
    })

    it("give false type value of rating, returning error", (done) => {
        request(app)
        .post("/Movies")
        .send(falseValuerating)
        .then(({status, body}) => {
            expect(status).toBe(404)
            expect(body.error[0]).toContain('rating value must be number')
            done()
        })
    })

    it("give false type value of title, returning error", (done) => {
        request(app)
        .post("/Movies")
        .send(falseValueTitle)
        .then(({status, body}) => {
            expect(status).toBe(404)
            expect(body.error[0]).toContain('title value must be string')
            done()
        })
    })

    it("give false type value of image, returning error", (done) => {
        request(app)
        .post("/Movies")
        .send(falseValueImage)
        .then(({status, body}) => {
            expect(status).toBe(404)
            expect(body.error[0]).toContain('image value must be string')
            done()
        })
    })

    it("give false type value of description, returning error", (done) => {
        request(app)
        .post("/Movies")
        .send(falseValueDescription)
        .then(({status, body}) => {
            expect(status).toBe(404)
            expect(body.error[0]).toContain('description value must be string')
            done()
        })
    })

    it("give rating value below 0, returning error", (done) => {
        request(app)
        .post("/Movies")
        .send(ratingBelow)
        .then(({status, body}) => {
            expect(status).toBe(404)
            expect(body.error[0]).toContain('rating value must below 10 and larger than 0')
            done()
        })
    })

    it("give rating value more than 10, returning error", (done) => {
        request(app)
        .post("/Movies")
        .send(ratingAbove)
        .then(({status, body}) => {
            expect(status).toBe(404)
            expect(body.error[0]).toContain('rating value must below 10 and larger than 0')
            done()
        })
    })

    it('give true input, success adding movie to DB', (done) => {
        request(app)
        .post('/Movies')
        .send(trueInput)
        .then(({status, body}) => {
            expect(status).toBe(201)
            expect(body.message).toContain("Movie added succesfully")
            expect(body).toHaveProperty('movie', expect.any(Object))
            id = body.movie.id
            done()
        })
    })
})

describe("GET /Movies", () => {
    it("return all of the movie data", (done) => {
        request(app)
        .get("/Movies")
        .then(({status, body}) => {
            expect(status).toBe(200)
            expect(body.message).toContain("heres your movie list:")
            expect(body).toHaveProperty('movie', expect.any(Object))
            done()
        })
    })
})

describe("GET /Movies/:ID", () => {
    it("give wrong id number, return error", (done) => {
        request(app)
        .get("/Movies/99")
        .then(({status, body}) => {
            expect(status).toBe(404)
            expect(body.error[0]).toContain("Data not found, please recheck id parameter")
            done()
        })
    })

    it("give wrong id value, return error", (done) => {
        request(app)
        .get("/Movies/ID99")
        .then(({status, body}) => {
            expect(status).toBe(400)
            expect(body.error[0]).toContain("invalid input syntax")
            done()
        })
    })

    it("give true id value, return movie object", (done) => {
        request(app)
        .get(`/Movies/${id}`)
        .then(({status, body}) => {
            expect(status).toBe(200)
            expect(body.message).toContain("heres the detail of the movie:")
            expect(body).toHaveProperty('movie', expect.any(Object))
            done()
        })
    })
})

describe("PATCH /Movies/:ID", () => {
    it("give false id and true input, returning error", (done) => {
        request(app)
        .patch(`/Movies/99`)
        .send(trueInput)
        .then(({status, body}) => {
            expect(status).toBe(404)
            expect(body.error[0]).toContain("Data not found, please recheck id parameter")
            done()
        })
    })

    it("give false id type value and true input, returning error", (done) => {
        request(app)
        .patch(`/Movies/lalala`)
        .send(trueInput)
        .then(({status, body}) => {
            expect(status).toBe(400)
            expect(body.error[0]).toContain("invalid input syntax")
            done()
        })
    })

    it("give true id value and false input null title, returning error", (done) => {
        request(app)
        .patch(`/Movies/${id}`)
        .send(nulTitle)
        .then(({status, body}) => {
            expect(status).toBe(404)
            expect(body.error[0]).toContain('Incomplete Data, please check and complete inputted data')
            done()
        })
    })

    it("give true id value and false input null rating, returning error", (done) => {
        request(app)
        .patch(`/Movies/${id}`)
        .send(nulRating)
        .then(({status, body}) => {
            expect(status).toBe(404)
            expect(body.error[0]).toContain('Incomplete Data, please check and complete inputted data')
            done()
        })
    })

    it("give true id value and false input value title, returning error", (done) => {
        request(app)
        .patch(`/Movies/${id}`)
        .send(falseValueTitle)
        .then(({status, body}) => {
            expect(status).toBe(404)
            expect(body.error[0]).toContain('title value must be string')
            done()
        })
    })

    it("give true id value and false input value image, returning error", (done) => {
        request(app)
        .patch(`/Movies/${id}`)
        .send(falseValueImage)
        .then(({status, body}) => {
            expect(status).toBe(404)
            expect(body.error[0]).toContain('image value must be string')
            done()
        })
    })

    it("give true id value and false input value description, returning error", (done) => {
        request(app)
        .patch(`/Movies/${id}`)
        .send(falseValueDescription)
        .then(({status, body}) => {
            expect(status).toBe(404)
            expect(body.error[0]).toContain('description value must be string')
            done()
        })
    })

    it("give true id value and false input value rating, returning error", (done) => {
        request(app)
        .patch(`/Movies/${id}`)
        .send(falseValuerating)
        .then(({status, body}) => {
            expect(status).toBe(404)
            expect(body.error[0]).toContain('rating value must be number')
            done()
        })
    })
    
    it("give true id value and rating below 0, returning error", (done) => {
        request(app)
        .patch(`/Movies/${id}`)
        .send(ratingBelow)
        .then(({status, body}) => {
            expect(status).toBe(404)
            expect(body.error[0]).toContain('rating value must below 10 and larger than 0')
            done()
        })
    })

    it("give true id value and rating above 10, returning error", (done) => {
        request(app)
        .patch(`/Movies/${id}`)
        .send(ratingAbove)
        .then(({status, body}) => {
            expect(status).toBe(404)
            expect(body.error[0]).toContain('rating value must below 10 and larger than 0')
            done()
        })
    })

    it("give true id value and true input, returning movie", (done) => {
        request(app)
        .patch(`/Movies/${id}`)
        .send(trueInput)
        .then(({status, body}) => {
            expect(status).toBe(201)
            expect(body.message).toContain("Movie updated succesfully")
            expect(body).toHaveProperty('movie', expect.any(Object))
            done()
        })
    })
})

describe("DELETE /Movies/:ID", () => {
    it("give invalid ID, return error", (done) => {
        request(app)
        .delete(`/Movies/100`)
        .then(({status, body}) => {
            expect(status).toBe(404)
            expect(body.error[0]).toContain("Data not found, please recheck id parameter")
            done()
        })
    })

    it("give invalid ID type, return error", (done) => {
        request(app)
        .delete(`/Movies/lala`)
        .then(({status, body}) => {
            expect(status).toBe(400)
            expect(body.error[0]).toContain("invalid input syntax")
            done()
        })
    })

    it("give valid ID, return message success", (done) => {
        request(app)
        .delete(`/Movies/${id}`)
        .then(({status, body}) => {
            expect(status).toBe(200)
            expect(body.message).toContain("movie has been deleted")
            done()
        })
    })
})