// models/User.js
import mongoose, { Schema } from 'mongoose';

// Experience Schema
const ExperienceSchema = new Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  toolsLearnt: { type: [String] },
  description: { type: String, required: true },
});

const Experience = mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);

// Education Schema
const EducationSchema = new Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  gpa: { type: String },
  gelink: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  coursesTaken: {
    type: [
      {
        name: { type: String, required: true },
        code: { type: String, required: true },
      }
    ],
    validate: {
      validator: function (value) {
        const courseSet = new Set(value.map(course => `${course.name}-${course.code}`));
        return courseSet.size === value.length;
      },
      message: props => `Each course in the coursesTaken array must be unique. Found duplicates in: ${props.value}`,
    },
  },
  description: { type: String },
});

const Education = mongoose.models.Education || mongoose.model('Education', EducationSchema);

// Project Schema
const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  technologies: { type: [String] },
  role: { type: String },
  glink: { type: String },
  drivelink: { type: String },
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

// Certification Schema
const CertificationSchema = new Schema({
  name: { type: String, required: true },
  authority: { type: String, required: true },
  licenseNumber: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  url: { type: String },
});

const Certification = mongoose.models.Certification || mongoose.model('Certification', CertificationSchema);

// Contact Schema
const ContactSchema = new Schema({
  email: { type: String, required: true },
  phone: { type: String },
  linkedIn: { type: String },
  github: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String },
  },
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

// Skill Schema
const SkillSchema = new Schema({
  name: { type: String, required: true },
  proficiency: { type: String, required: true }, // e.g., Beginner, Intermediate, Advanced, Expert
});

const Skill = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);


// User Schema
const UserSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  summary: { type: String, required: true },
  educations: [Education.schema],
  experiences: [Experience.schema],
  projects: [Project.schema],
  certifications: [Certification.schema],
  contact: { type: Contact.schema, required: true },
  skills: [Skill.schema],
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
