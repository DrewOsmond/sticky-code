"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const bcrypt = __importStar(require("bcrypt"));
const Note_1 = require("./Note");
const Comment_1 = require("./Comment");
const Collection_1 = require("./Collection");
let User = class User {
    stringPasswordToHashed() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    checkValidPassword(passwordToCheck) {
        return bcrypt.compareSync(passwordToCheck, this.password);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", unique: true, nullable: false }),
    class_validator_1.Length(4, 12),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", unique: true, nullable: false }),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", nullable: false }),
    class_validator_1.Length(8, 100),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.OneToMany(() => Note_1.Note, (note) => note.user, { onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], User.prototype, "notes", void 0);
__decorate([
    typeorm_1.OneToMany(() => Comment_1.Comment, (comment) => comment.user, { onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    typeorm_1.OneToMany(() => Collection_1.Collection, (collections) => collections.user),
    __metadata("design:type", Array)
], User.prototype, "collections", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Note_1.Note, {
        cascade: true,
    }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], User.prototype, "favorite_notes", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "updated_at", void 0);
User = __decorate([
    typeorm_1.Entity("users"),
    typeorm_1.Unique(["username", "email"])
], User);
exports.User = User;
//# sourceMappingURL=User.js.map