"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Note_1 = require("./Note");
let Comment = class Comment {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.comments, {
        cascade: true,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", User_1.User)
], Comment.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Note_1.Note, (note) => note.comments, {
        cascade: true,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Note_1.Note)
], Comment.prototype, "note", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: "text" }),
    __metadata("design:type", String)
], Comment.prototype, "description", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Comment.prototype, "created_at", void 0);
Comment = __decorate([
    typeorm_1.Entity("comments")
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map