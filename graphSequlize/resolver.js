var CategrySchema = require('./Schema/customer')

const resolvers = {
    Query: {
        CourceAll: () => {
            return CategrySchema.findAll();
        },
        fetchOne: (root,args) => {
            return CategrySchema.findById(args.Category_id);
        },
        fetchData: (root,args) => {
            return CategrySchema.findAll({where:{Category_id:args.Category_id}});
        }
    },
    Mutation:{
        addCategory:(root,args)=>{
            return new CategrySchema({
                Category_Name:args.Category_Name,
                active:args.active
            }).save()
        },
        updateData:(root,args)=>{
            data={"Category_Name":args.Category_Name,"active":args.active,"Category_id":args.Category_id}
            CategrySchema.update(data,{where:{Category_id:args.Category_id}})
            return data
        },
        deleteData:(root,args)=>{
           if(CategrySchema.destroy({where:{Category_id:args.Category_id}})){
               message1 = {message: `${args.Category_id} is deleted `}
               return message1
           }
        }
    }
};

module.exports = resolvers;
