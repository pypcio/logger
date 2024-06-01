-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_eventGroupId_fkey" FOREIGN KEY ("eventGroupId") REFERENCES "EventGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
