const Source = require('../models/source-model')
const Company = require('../models/company-model')

class SourceController {
    async createSource(req, res) {
        const companyId = req.user._id
        const {url, title, content} = req.body
        try {
            const company = await Company.findById(companyId)
            if (!company) return res.status(404).json({message: "Company not found"})

            const newSource = new Source({
                url,
                title,
                content,
                company_id: companyId
            })
            await newSource.save()
            company.sources.push(newSource._id)
            await company.save()
            res.status(201).json({message: "Source successfully created"})
        } catch (err) {
            res.status(500).json({message: 'Internal server error'})
        }
    }

    async getSources(req,res) {
        const companyId = req.user._id
        try{
            const company = await Company.findById(companyId)
            res.status(200).json(company)
        } catch (err) {
            res.status(500).json({message: 'Internal server error'})
        }
    }
    async getSourceById(req,res) {
        const companyId = req.user._id
        const sourceId = req.params.id
        try{
            const source = await Source.findById(sourceId)
            if(!source) return res.status(404).json({message: 'Source not found'})
            if(source.company_id.toString() === companyId) return res.status(200).json(source)
            res.status(403).json({message:'You are not allowed to access this page'})
        } catch (err) {
            res.status(500).json({message: 'Internal server error'})
        }
    }
    async updateSource(req,res) {
        const companyId = req.user._id
        const sourceId = req.params.id
        const {url, title, content} = req.body
        try{
            const source = await Source.findById(sourceId)
            if(!source) res.status(404).json({message: 'Source not found'})
            if(source.company_id.toString() === companyId) {
                await Source.findByIdAndUpdate(
                    sourceId,
                    {url, title, content},
                    {new: true})
                return res.status(200).json({message: 'Source successfully updated'})
            }
            res.status(403).json({message:'You are not allowed to access this page'})
        } catch (err) {
            res.status(500).json({message: 'Internal server error'})
        }
    }
    async deleteSource(req,res) {
        const companyId = req.user._id
        const sourceId = req.params.id
        try{
            const source = await Source.findById(sourceId)
            if(!source) res.status(404).json({message: 'Source not found'})
            if(source.company_id.toString() === companyId) {
                await Source.findByIdAndDelete(sourceId)
                await Company.findByIdAndUpdate(companyId, {$pull: {sources: sourceId}}, {new: true})
                return res.status(200).json({message: 'Source successfully deleted'})
            }
            res.status(403).json({message:'You are not allowed to access this page'})
        } catch (err) {
            res.status(500).json({message: 'Internal server error'})
        }
    }
}

module.exports = new SourceController()
