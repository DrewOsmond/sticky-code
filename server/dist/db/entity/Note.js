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
exports.Note = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Comment_1 = require("./Comment");
const Collection_1 = require("./Collection");
let Note = class Note {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Note.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Collection_1.Collection, (collection) => collection.notes, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Collection_1.Collection)
], Note.prototype, "collection", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.notes, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", User_1.User)
], Note.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => Comment_1.Comment, (comment) => comment.note),
    __metadata("design:type", Array)
], Note.prototype, "comments", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Note.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Note.prototype, "language", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: "text" }),
    __metadata("design:type", String)
], Note.prototype, "description", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Note.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Note.prototype, "updated_at", void 0);
Note = __decorate([
    typeorm_1.Entity("notes")
], Note);
exports.Note = Note;
//# sourceMappingURL=Note.js.map