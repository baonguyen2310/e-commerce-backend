'use strict'

const ProductService = require('../services/product.service')
const { OK, CREATED } = require('../core/success.response')
const { BadRequestError } = require('../core/error.response')

class ProductController {
    createProduct = async (req, res, next) => {
        try {
            const newProduct =  await ProductService.createProduct(
                req.body.product_type,
                {
                    ...req.body,
                    product_shop: req.user.userId //product_shop lấy từ userId được decode ra từ middleware authentication
                }
                )
            return new CREATED({
                message: 'created product success',
                metadata: newProduct
            }).send(res)
        } catch (error) {
            next(error)
        }
    }

    updateProduct = async (req, res, next) => {
        try {
            const updateProduct = await ProductService.updateProduct(
                req.body.product_type,
                req.params.id,
                {
                    ...req.body,
                    product_shop: req.user.userId
                }
            )
            return new OK({
                message:'update product success',
                metadata: updateProduct
            }).send(res)
        } catch (error) {
            next(error)
        }
    }

    /**
     * @description Get all drafts for shop
     * @param {Number} limit
     * @returns {JSON}
     */

    getAllDraftsForShop = async (req, res, next) => {
        try {
            const productList = await ProductService.findAllDraftsForShop({
                product_shop: req.user.userId
            })
            return new OK({
                message: 'get all drafts for shop success',
                metadata: productList
            }).send(res)
        } catch (error) {
            next(error)
        }
    }

    getAllPublishedForShop = async (req, res, next) => {
        try {
            const productList = await ProductService.findAllPublishedForShop({
                product_shop: req.user.userId
            })
            return new OK({
                message: 'get all published for shop success',
                metadata: productList
            }).send(res)
        } catch (error) {
            next(error)
        }
    }

    publishProductByShop = async (req, res, next) => {
        try {
            const result = await ProductService.publishProductByShop({
                product_shop: req.user.userId,
                product_id: req.params.id
            })
            if (!result) throw new BadRequestError({ message: 'failed to publish' })
            return new OK({
                message: 'publish product by shop success',
                metadata: result
            }).send(res)
        } catch (error) {
            next(error)
        }
    }

    unPublishProductByShop = async (req, res, next) => {
        try {
            const result = await ProductService.unPublishProductByShop({
                product_shop: req.user.userId,
                product_id: req.params.id
            })
            if (!result) throw new BadRequestError({ message: 'failed to unpublish' })
            return new OK({
                message: 'unpublish product by shop success',
                metadata: result
            }).send(res)
        } catch (error) {
            next(error)
        }
    }

    getAllProducts = async (req, res, next) => {
        try {
            const productList = await ProductService.findAllProducts(req.params)
            if (!productList) throw new BadRequestError({ message: 'not have products for get' })
            return new OK({
                message: 'get all products success',
                metadata: productList
            }).send(res)
        } catch (error) {
            next(error)
        }
    }

    getProduct = async (req, res, next) => {
        try {
            const product = await ProductService.findProduct({
                product_id: req.params.id
            })
            if (!product) throw new BadRequestError({ message: 'not has product for get' })
            return new OK({
                message: 'get product success',
                metadata: product
            }).send(res)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ProductController()