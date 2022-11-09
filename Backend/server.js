const express = require('express');
require('dotenv').config({ path: __dirname + '../../.env' });
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const dayjs = require('dayjs');
const isBetween = require('dayjs/plugin/isBetween');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const resourceModel = require('./models/resourcemodel.js');
const jobModel = require('./models/jobModel.js');
const userModel = require('./models/usermodels.js');
const planModel = require('./models/planmodel.js');
const productModel = require('./models/productmodel.js');

const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function main() {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', function () {
      console.log('Connected successfully');
    });
  } catch (error) {
    console.log(error);
  }
}

main().catch(console.error);

app.get('/api/resources', async (req, res) => {
  const resources = await resourceModel.find({});
  try {
    res.send(resources);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username: username, password: password });
    if (user) {
      res.json(user);
      console.log('Logged In');
    } else {
      console.log('User not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/jobs', async (req, res) => {
  const jobs = await jobModel.find({});
  try {
    res.send(jobs);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/products', async (req, res) => {
  const products = await productModel.find({});
  try {
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/plan', async (req, res) => {
  const plan = await planModel.find({});
  const jobs = await jobModel.find({});

  try {
    const allocatedJobs = jobs.filter(item => Number(item.rCount) === Number(item.resources.length));

    let sNO = [];
    allocatedJobs.forEach(job => {
      sNO.push(job.planId);
    });
    // const unAllocatedAct = plan.filter(item => !sNO.includes(item._id));
    const unAllocatedActivities = await planModel.find({
      $and: [{ _id: { $nin: sNO } }, { status: { $exists: true } }, { status: { $ne: 'Completed' } }]
    });

    res.send(unAllocatedActivities);
    // res.send(plan);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get('/api/plan_all', async (req, res) => {
  const plan = await planModel.find({});

  try {
    res.send(plan);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/serial_numbers', async (req, res) => {
  const jobs = await jobModel.find({ serialNumber: { $ne: 'NA' } });
  try {
    const a = jobs.map(item => item.serialNumber);
    const b = Array.from(new Set(a));
    const c = b.map(item => item.trim());
    res.status(200).send(c);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/plan_event', async (req, res) => {
  const { id } = req.body;
  if (mongoose.isValidObjectId(id)) {
    const event = await planModel.findOne({ _id: id });

    try {
      res.send(event);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Invalid Id');
    res.status(500).send('Invalid Id');
  }
});

app.post('/api/edit_plan', async (req, res) => {
  const { data, id } = req.body;
  try {
    if (mongoose.isValidObjectId(id)) {
      await planModel.updateOne({ _id: id }, [
        {
          $set: { description: data.description }
        },
        { $set: { activity: data.activity } },
        { $set: { startWeek: data.startWeek } },
        { $set: { endWeek: data.endWeek } },
        { $set: { startDate: data.startDate } },
        { $set: { endDate: data.endDate } },
        { $set: { duration: data.duration } },
        { $set: { dayOfWeek: data.dayOfWeek } },
        { $set: { area: data.area } },
        { $set: { site: data.site } },
        { $set: { product: data.product } },
        { $set: { serialNumber: data.serialNumber } },
        { $set: { rCount: data.rCount } }
      ]);
      res.status(200).send('Updated Data');
    } else {
      res.status(500).send('Invalid ID');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/get_resource', async (req, res) => {
  const { id } = req.body;
  if (mongoose.isValidObjectId(id)) {
    try {
      const resource = await resourceModel.findOne({ _id: id });
      res.status(200).send(resource);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(500).send('Invalid ID');
  }
});

app.post('/api/get_job', async (req, res) => {
  const { id } = req.body;
  if (mongoose.isValidObjectId(id)) {
    try {
      const job = await jobModel.findOne({ _id: id });
      res.status(200).send(job);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(500).send('Invalid ID');
  }
});

app.post('/api/get_plannedjob', async (req, res) => {
  const { id } = req.body;
  if (mongoose.isValidObjectId(id)) {
    try {
      const plannedJob = await planModel.findOne({ _id: id });
      res.status(200).send(plannedJob);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(500).send('Invalid ID');
  }
});

app.post('/api/add_resource', async (req, res) => {
  const resource = new resourceModel(req.body);

  try {
    await resource.save();
    res.status(200).send('Added to Database');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post('/api/delete_resource', async (req, res) => {
  const { id } = req.body;
  if (mongoose.isValidObjectId(id)) {
    try {
      resourceModel.deleteOne({ _id: id }, () => {
        res.status(200).send('Deleted Resource');
      });
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(500).send('Invalid Id');
  }
});

app.put('/api/edit_resource', async (req, res) => {
  const { id, data } = req.body;
  if (mongoose.isValidObjectId(id)) {
    try {
      await resourceModel.updateOne({ _id: id }, [
        {
          $set: { name: data.name }
        },
        { $set: { area: data.area } },
        { $set: { site: data.site } },
        { $set: { products: data.products } },
        { $set: { email: data.email } }
      ]);
      res.status(200).send('Updated Data');
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(500).send('Invalid Id');
  }
});
app.post('/api/add_job', async (req, res) => {
  const job = new jobModel(req.body);

  try {
    await job.save();
    res.status(200).send('Added to Database');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post('/api/add_plan', async (req, res) => {
  const plan = new planModel(req.body);

  try {
    await plan.save();
    res.status(200).send('Added to Database');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post('/api/delete_job', async (req, res) => {
  const { id } = req.body;
  if (mongoose.isValidObjectId(id)) {
    try {
      jobModel.deleteOne({ _id: id }, () => {
        res.status(200).send('Deleted Resource');
      });
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(500).send('Invalid Id');
  }
});

app.post('/api/remove_res', async (req, res) => {
  const { id } = req.body;
  if (mongoose.isValidObjectId(id)) {
    try {
      await jobModel.updateOne({ _id: id }, { $set: { resources: [] } });
      res.status(200).send('Removed Resources');
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(500).send('Invalid Id');
  }
});

app.post('/api/delete_plan', async (req, res) => {
  const { id } = req.body;
  if (mongoose.isValidObjectId(id)) {
    try {
      planModel.deleteOne({ _id: id }, () => {
        res.status(200).send('Deleted Resource');
      });
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(500).send('Invalid Id');
  }
});

app.put('/api/edit_job', async (req, res) => {
  const { id, data } = req.body;
  if (mongoose.isValidObjectId(id)) {
    try {
      const curJob = await jobModel.findOne({ _id: id });
      const assignedRes = curJob.resources;
      let reSched = true;
      // if (assignedRes.length > 0) {
      //   //Check if rescheduling possible
      //   const d1 = dayjs(data.startDate);
      //   const d2 = dayjs(data.endDate);
      //   const allJobs = await jobModel.find({});
      //   let unAvlRes = [];
      //   const concurrentJobs = allJobs.filter(item => dayjs(item.startDate.split(' ')[0]).isSameOrBefore(data.endDate) && dayjs(item.endDate.split(' ')[0]).isSameOrAfter(data.startDate) && item._id !== id);
      //   concurrentJobs.forEach(item => {
      //     item.resources.forEach(re => {
      //       unAvlRes.push(re);
      //     });
      //   });
      //   assignedRes.forEach(item => {
      //     if (unAvlRes.includes(item)) {
      //       reSched = false;
      //     }
      //   });

      //   if (reSched) {
      //     await jobModel.updateOne({ _id: id }, [
      //       {
      //         $set: { description: data.description }
      //       },
      //       { $set: { activity: data.activity } },
      //       { $set: { startDate: data.startDate } },
      //       { $set: { endDate: data.endDate } },
      //       { $set: { area: data.area } },
      //       { $set: { site: data.site } },
      //       { $set: { product: data.product } },
      //       { $set: { serialNumber: data.serialNumber } },
      //       { $set: { rCount: data.rCount } }
      //     ]);
      //     res.status(200).send('Updated Data');
      //   } else {
      //     await jobModel.updateOne({ _id: id }, [
      //       {
      //         $set: { description: data.description }
      //       },
      //       { $set: { activity: data.activity } },
      //       { $set: { startDate: data.startDate } },
      //       { $set: { endDate: data.endDate } },
      //       { $set: { area: data.area } },
      //       { $set: { site: data.site } },
      //       { $set: { product: data.product } },
      //       { $set: { serialNumber: data.serialNumber } },
      //       { $set: { rCount: data.rCount } },
      //       { $set: { resources: [] } }
      //     ]);
      //     res.status(202).send('Resource Removed');
      //   }
      // } else {
      //   await jobModel.updateOne({ _id: id }, [
      //     {
      //       $set: { description: data.description }
      //     },
      //     { $set: { activity: data.activity } },
      //     { $set: { startDate: data.startDate } },
      //     { $set: { endDate: data.endDate } },
      //     { $set: { area: data.area } },
      //     { $set: { site: data.site } },
      //     { $set: { product: data.product } },
      //     { $set: { serialNumber: data.serialNumber } },
      //     { $set: { rCount: data.rCount } }
      //   ]);
      //   res.status(200).send('Updated Data');
      // }
      await jobModel.updateOne({ _id: id }, [
        {
          $set: { description: data.description }
        },
        { $set: { activity: data.activity } },
        { $set: { startDate: data.startDate } },
        { $set: { endDate: data.endDate } },
        { $set: { area: data.area } },
        { $set: { site: data.site } },
        { $set: { product: data.product } },
        { $set: { serialNumber: data.serialNumber } },
        { $set: { rCount: data.rCount } },
        { $set: { comments: data.comments } }
      ]);
      if (curJob.planId && mongoose.isValidObjectId(curJob.planId)) {
        await planModel.updateOne({ _id: curJob.planId }, [
          {
            $set: { description: data.description }
          },
          { $set: { activity: data.activity } },
          { $set: { area: data.area } },
          { $set: { site: data.site } },
          { $set: { product: data.product } },
          { $set: { serialNumber: data.serialNumber } },
          { $set: { rCount: data.rCount } }
        ]);
      }
      res.status(200).send('Updated Data');
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  } else {
    res.status(500).send('Invalid Id');
  }
});

app.post('/api/available_resources', async (req, res) => {
  const { startDate, endDate, area } = req.body;
  try {
    // Algo here
    const d1 = dayjs(startDate);
    const d2 = dayjs(endDate);
    const validResources = await resourceModel.find({});
    const allJobs = await jobModel.find({});
    let unAvlRes = [];
    const concurrentJobs = allJobs.filter(item => dayjs(item.startDate.split(' ')[0]).isSameOrBefore(endDate) && dayjs(item.endDate.split(' ')[0]).isSameOrAfter(startDate));
    concurrentJobs.forEach(item => {
      item.resources.forEach(re => {
        unAvlRes.push(re);
      });
    });
    const avlRes = validResources.filter(val => !unAvlRes.includes(val.name));

    res.status(200).send(avlRes);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/allocation_resources', async (req, res) => {
  const { startDate, endDate, area } = req.body;
  try {
    // Algo here
    const d1 = dayjs(startDate);
    const d2 = dayjs(endDate);
    const validResources = await resourceModel.find({});
    const allJobs = await jobModel.find({});
    let unAvlRes = [];
    let unAvlResData = [];
    let avlResData = [];
    const concurrentJobs = allJobs.filter(item => dayjs(item.startDate.split(' ')[0]).isSameOrBefore(endDate) && dayjs(item.endDate.split(' ')[0]).isSameOrAfter(startDate));
    concurrentJobs.forEach(item => {
      item.resources.forEach(re => {
        const load = {
          name: re,
          description: item.description,
          status: false
        };
        unAvlRes.push(re);
        unAvlResData.push(load);
      });
    });
    const avlRes = validResources.filter(val => !unAvlRes.includes(val.name));
    avlRes.forEach(item => {
      const load = {
        name: item.name,
        data: item,
        status: true
      };
      avlResData.push(load);
    });

    const finalResults = [...avlResData, ...unAvlResData];

    res.status(200).send(finalResults);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/report_data', async (req, res) => {
  const { name, startDate, endDate, area, site, products, activity, serialNumber } = req.body;
  try {
    const jobData = await jobModel.find({});
    if (area && !site && startDate && endDate && !activity && products.length === 0 && !name && !serialNumber) {
      const relData = jobData.filter(item => item.area === area);
      const relevData = relData.filter(item => dayjs(item.startDate.split(' ')[0]).isSameOrBefore(endDate) && dayjs(item.endDate.split(' ')[0]).isSameOrAfter(startDate));
      res.status(200).send(relevData);
      //
    } else if (area && site && startDate && endDate && !activity && products.length === 0 && !name && !serialNumber) {
      const relData = jobData.filter(item => item.area === area && item.site === site);
      const relevData = relData.filter(item => dayjs(item.startDate.split(' ')[0]).isSameOrBefore(endDate) && dayjs(item.endDate.split(' ')[0]).isSameOrAfter(startDate));
      res.status(200).send(relevData);
      //
    } else if (!area && site && startDate && endDate && !activity && products.length === 0 && !name && !serialNumber) {
      const relData = jobData.filter(item => item.site === site);
      const relevData = relData.filter(item => dayjs(item.startDate.split(' ')[0]).isSameOrBefore(endDate) && dayjs(item.endDate.split(' ')[0]).isSameOrAfter(startDate));
      res.status(200).send(relevData);
      //
    } else if (!area && site && startDate && endDate && activity && products.length === 0 && !name && !serialNumber) {
      const relData = jobData.filter(item => item.site === site && item.activity === activity);
      const relevData = relData.filter(item => dayjs(item.startDate.split(' ')[0]).isSameOrBefore(endDate) && dayjs(item.endDate.split(' ')[0]).isSameOrAfter(startDate));
      res.status(200).send(relevData);
      //
    } else if (area && !site && startDate && endDate && activity && products.length === 0 && !name && !serialNumber) {
      const relData = jobData.filter(item => item.area === area && item.activity === activity);
      const relevData = relData.filter(item => dayjs(item.startDate.split(' ')[0]).isSameOrBefore(endDate) && dayjs(item.endDate.split(' ')[0]).isSameOrAfter(startDate));
      res.status(200).send(relevData);
      //
    } else if (area && !site && startDate && endDate && !activity && products.length > 0 && !name && !serialNumber) {
      const relData = jobData.filter(item => item.area === area && products.includes(item.product));
      const relevData = relData.filter(item => dayjs(item.startDate.split(' ')[0]).isSameOrBefore(endDate) && dayjs(item.endDate.split(' ')[0]).isSameOrAfter(startDate));
      res.status(200).send(relevData);
      //
    } else if (area && site && startDate && endDate && !activity && products.length > 0 && !name && !serialNumber) {
      const relData = jobData.filter(item => item.area === area && products.includes(item.product) && item.site === site);
      const relevData = relData.filter(item => dayjs(item.startDate.split(' ')[0]).isSameOrBefore(endDate) && dayjs(item.endDate.split(' ')[0]).isSameOrAfter(startDate));
      res.status(200).send(relevData);
      //
    } else if (area && site && startDate && endDate && activity && products.length > 0 && !name && !serialNumber) {
      const relData = jobData.filter(item => item.area === area && products.includes(item.product) && item.site === site && item.activity === activity);
      const relevData = relData.filter(item => dayjs(item.startDate.split(' ')[0]).isSameOrBefore(endDate) && dayjs(item.endDate.split(' ')[0]).isSameOrAfter(startDate));
      res.status(200).send(relevData);
      //
    } else if (area && site && startDate && endDate && activity && products.length > 0 && name && !serialNumber) {
      const relData = jobData.filter(item => item.area === area && products.includes(item.product) && item.site === site && item.activity === activity && item.resources.includes(name));
      const relevData = relData.filter(item => dayjs(item.startDate.split(' ')[0]).isSameOrBefore(endDate) && dayjs(item.endDate.split(' ')[0]).isSameOrAfter(startDate));
      res.status(200).send(relevData);
      //
    } else if (area && site && startDate && endDate && activity && products.length === 0 && !name && !serialNumber) {
      const relData = jobData.filter(item => item.area === area && item.site === site && item.activity === activity);
      const relevData = relData.filter(item => dayjs(item.startDate.split(' ')[0]).isSameOrBefore(endDate) && dayjs(item.endDate.split(' ')[0]).isSameOrAfter(startDate));
      res.status(200).send(relevData);
      //
    } else if (name && startDate && endDate && !area && !site && !activity && products.length === 0 && !serialNumber) {
      const relData = jobData.filter(item => item.resources.includes(name));
      const relevData = relData.filter(item => dayjs(item.startDate.split(' ')[0]).isSameOrBefore(endDate) && dayjs(item.endDate.split(' ')[0]).isSameOrAfter(startDate));
      res.status(200).send(relevData);
    } else if (name && startDate && endDate && area && !site && !activity && products.length === 0 && !serialNumber) {
      const relData = jobData.filter(item => item.resources.includes(name) && item.area === area);
      const relevData = relData.filter(item => dayjs(item.startDate.split(' ')[0]).isSameOrBefore(endDate) && dayjs(item.endDate.split(' ')[0]).isSameOrAfter(startDate));
      res.status(200).send(relevData);
    } else if (name && startDate && endDate && area && site && !activity && products.length === 0 && !serialNumber) {
      const relData = jobData.filter(item => item.resources.includes(name) && item.area === area && item.site === site);
      const relevData = relData.filter(item => dayjs(item.startDate.split(' ')[0]).isSameOrBefore(endDate) && dayjs(item.endDate.split(' ')[0]).isSameOrAfter(startDate));
      res.status(200).send(relevData);
    } else if (!name && startDate && endDate && !area && site && !activity && products.length === 0 && !serialNumber) {
      const relData = jobData.filter(item => item.site === site);
      const relevData = relData.filter(item => dayjs(item.startDate.split(' ')[0]).isSameOrBefore(endDate) && dayjs(item.endDate.split(' ')[0]).isSameOrAfter(startDate));
      res.status(200).send(relevData);
    } else if (!name && startDate && endDate && !area && !site && activity && products.length === 0 && !serialNumber) {
      const relData = jobData.filter(item => item.activity === activity);
      const relevData = relData.filter(item => dayjs(item.startDate.split(' ')[0]).isSameOrBefore(endDate) && dayjs(item.endDate.split(' ')[0]).isSameOrAfter(startDate));
      res.status(200).send(relevData);
    } else if (!name && startDate && endDate && !area && !site && !activity && products.length > 0 && !serialNumber) {
      const relData = jobData.filter(item => products.includes(item.product));
      const relevData = relData.filter(item => dayjs(item.startDate.split(' ')[0]).isSameOrBefore(endDate) && dayjs(item.endDate.split(' ')[0]).isSameOrAfter(startDate));
      res.status(200).send(relevData);
    } else if (!name && startDate && endDate && !area && !site && activity && products.length > 0 && !serialNumber) {
      const relData = jobData.filter(item => products.includes(item.product) && item.activity === activity);
      const relevData = relData.filter(item => dayjs(item.startDate.split(' ')[0]).isSameOrBefore(endDate) && dayjs(item.endDate.split(' ')[0]).isSameOrAfter(startDate));
      res.status(200).send(relevData);
    } else if (!name && startDate && endDate && !area && !site && !activity && products.length === 0 && !serialNumber) {
      const relevData = jobData.filter(item => dayjs(item.startDate.split(' ')[0]).isSameOrBefore(endDate) && dayjs(item.endDate.split(' ')[0]).isSameOrAfter(startDate));
      res.status(200).send(relevData);
    } else if (!name && startDate && endDate && !area && !site && !activity && products.length === 0 && serialNumber) {
      const relData = jobData.filter(item => item.serialNumber === serialNumber);
      const relevData = relData.filter(item => dayjs(item.startDate.split(' ')[0]).isSameOrBefore(endDate) && dayjs(item.endDate.split(' ')[0]).isSameOrAfter(startDate));
      res.status(200).send(relevData);
    } else if (!name && !startDate && !endDate && !area && !site && !activity && products.length === 0 && serialNumber) {
      const relData = jobData.filter(item => item.serialNumber === serialNumber);
      res.status(200).send(relData);
    } else {
      res.status(202).send('Invalid Form Details');
    }
    // More cases here
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/assign_resource', async (req, res) => {
  const { name, rCount, id } = req.body;
  try {
    const job = await jobModel.findOne({ _id: id });
    if (job.resources.length + 1 <= rCount) {
      if (job.resources.includes(name)) {
        res.status(204).send('Assigned Already');
      } else {
        await jobModel.updateOne({ _id: id }, { $push: { resources: name } });
        res.status(200).send('Updated');
      }
    } else {
      res.status(205).send('Requirement Filled');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../Frontend/dist')));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'Frontend', 'dist', 'index.html')));
} else {
  app.get('/', (req, res) => {
    res.send('Helloooo');
  });
}

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, (req, res) => {
  console.log(`Server listening at port ${port}`);
});
